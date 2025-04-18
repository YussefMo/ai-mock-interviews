import { App, cert, getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | undefined; // Keep track of the app instance

function initializeAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase Admin SDK environment variables missing!');
    throw new Error(
      'Missing Firebase Admin SDK configuration in environment variables.'
    );
  }

  try {
    // Try to get the existing app first
    app = getApp();
    console.log(
      'Firebase Admin SDK already initialized. Getting existing app.'
    );
    console.log(
      'Existing default app Project ID from options:',
      app.options.projectId // Log project ID from the app instance
    );
    console.log('Existing app.options:', app.options);
  } catch (error: any) {
    // If getApp() throws, it means the default app doesn't exist, so initialize it
    console.log('No existing default app found, initializing...', error);
    try {
      app = initializeApp({
        credential: cert({
          projectId: projectId, // Use variable directly
          clientEmail: clientEmail, // Use variable directly
          privateKey: privateKey.replace(/\\n/g, '\n')
        })
      });
      console.log(
        'Firebase Admin SDK initialized successfully. Project ID from options:',
        app.options.projectId // Log project ID from the app instance
      );
    } catch (initError) {
      console.error('Error initializing Firebase Admin SDK:', initError);
      throw initError; // Re-throw initialization errors
    }
  }
}

function getFirebaseAdminServices() {
  if (!app) {
    initializeAdminApp(); // Initialize if not already done
  }

  // Ensure we have a valid app instance after attempting initialization
  if (!app || !app.options) {
    console.error(
      'Firebase Admin App instance is invalid after initialization attempt.'
    );
    console.log('App instance details:', app);
    console.log('-----------------------------------------');
    throw new Error('Invalid Firebase Admin App instance.');
  }

  console.log(
    'App instance seems valid before getting services. Project ID from options:',
    app.options.projectId
  );

  try {
    console.log('Attempting to get Auth and Firestore instances...');
    const authInstance = getAuth(app); // Explicitly pass the app instance
    console.log('Auth instance obtained:', !!authInstance);
    const dbInstance = getFirestore(app); // Explicitly pass the app instance
    console.log('Firestore instance obtained:', !!dbInstance);

    // Log the project ID using the app instance directly
    console.log(
      'Auth and Firestore instances obtained using app for project:',
      app.options.projectId // Use the validated app instance's project ID
    );
    console.log('-----------------------------------------');
    return {
      auth: authInstance,
      db: dbInstance
      // app: app // Optionally return the app instance itself
    };
  } catch (error) {
    console.error('Error getting Auth/Firestore instances:', error);
    console.log('App instance details during service retrieval error:', app);
    console.log('-----------------------------------------');
    throw error; // Re-throw
  }
}

// Export the services by calling the getter function
// This ensures initialization happens only when services are first imported/used
const services = getFirebaseAdminServices();
export const auth = services.auth;
export const db = services.db;
