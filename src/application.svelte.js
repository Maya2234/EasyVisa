// The applicant's answers, shared by the form page and the review page.
// Nothing is saved anywhere: this is sample data so the prototype can be clicked through.

// Typing this ID on the retrieve page "finds" a saved application
export const DEMO_ID = 'AA00EV2026';

// Sample answers, already filled in. Every field can still be edited.
function sampleAnswers() {
  return {
    surname: 'Doe',
    givenNames: 'Jane',
    sex: 'F',
    birthDate: '1996-04-12',
    birthCity: 'Guadalajara',
    birthCountry: 'Mexico',
    nationality: 'Mexico',

    passportNumber: 'G41827365',
    passportCountry: 'Mexico',
    passportIssued: '2022-03-08',
    passportExpires: '2032-03-07',

    purpose: 'B1/B2',
    arrivalDate: '2027-02-15',
    stayDays: 14,
    usAddress: '350 5th Ave, New York, NY 10118',

    email: 'jane.doe@example.com',
    phone: '+52 33 1234 5678',
    homeAddress: 'Av. Chapultepec 480, Guadalajara, Jalisco 44100, Mexico'
  };
}

export const application = $state({
  id: '',
  source: 'new',          // 'new' (just started) or 'saved' (retrieved)
  embassy: '',
  lastSaved: null,        // Date the person last pressed Save
  submittedAt: null,      // Date the application was submitted
  answers: sampleAnswers()
});

// A made-up ID in the real format: AA00 + 6 letters/numbers
function newId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'AA00';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// "Start an application" path
export function startNewApplication(embassy) {
  application.id = newId();
  application.source = 'new';
  application.embassy = embassy || 'Mexico City, Mexico';
  application.lastSaved = null;
  application.submittedAt = null;
  application.answers = sampleAnswers();
}

// "Retrieve an application" path
export function openSavedApplication(id) {
  application.id = id;
  application.source = 'saved';
  application.embassy = 'Mexico City, Mexico';
  application.lastSaved = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // two days ago
  application.submittedAt = null;
  application.answers = sampleAnswers();
}
