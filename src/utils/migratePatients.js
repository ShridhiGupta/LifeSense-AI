// Migration utility to move patients from localStorage to backend database
import { API_ENDPOINTS } from '../config/api.js';

export const migrateLocalPatientsToBackend = async () => {
  try {
    // Get patients from localStorage
    const localPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
    
    if (localPatients.length === 0) {
      console.log("No patients to migrate");
      return { success: true, migrated: 0 };
    }

    console.log(`Found ${localPatients.length} patients in localStorage`);
    
    let migrated = 0;
    let failed = 0;

    // Migrate each patient
    for (const patient of localPatients) {
      try {
        const response = await fetch(API_ENDPOINTS.ADMIN_PATIENTS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patient.patientId || patient.id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            condition: patient.condition,
            recoveryPeriod: patient.recoveryPeriod,
            currentStage: patient.currentStage,
            doctorsNotes: patient.doctorsNotes,
            medications: patient.medications,
            exercises: patient.exercises,
            diet: patient.diet,
            addedBy: patient.addedBy,
            addedByEmail: patient.addedByEmail
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          migrated++;
          console.log(`✓ Migrated patient: ${patient.name} (ID: ${patient.patientId || patient.id})`);
        } else {
          failed++;
          console.error(`✗ Failed to migrate patient: ${patient.name}`, data.message);
        }
      } catch (error) {
        failed++;
        console.error(`✗ Error migrating patient: ${patient.name}`, error);
      }
    }

    console.log(`Migration complete: ${migrated} succeeded, ${failed} failed`);
    
    return {
      success: true,
      total: localPatients.length,
      migrated,
      failed
    };
  } catch (error) {
    console.error("Migration error:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
