import userAssociation from "./userAssociation.js";
import diseaseAssociation from "./diseaseAssociation.js";
import diseaseCureAssociation from "./diseaseCureAssociation.js";
import diseaseDescriptionAssociation from "./diseaseDescriptionAssociation.js";
import diseasePreventionAssociation from "./diseasePreventionAssociation.js";
import diseaseSymptomAssociation from "./diseaseSymptomAssociation.js";
import diagnosisAssociation from "./diagnosisAssociation.js";
import plantAssociation from "./plantAssociation.js";
import reportAssociation from "./reportAssociation.js";
import uploadAssociation from "./uploadAssociation.js";

export default function associations(db) {
  userAssociation(db);
  diseaseAssociation(db);
  diseaseCureAssociation(db);
  diseaseDescriptionAssociation(db);
  diseasePreventionAssociation(db);
  diseaseSymptomAssociation(db);
  diagnosisAssociation(db);
  plantAssociation(db);
  reportAssociation(db);
  uploadAssociation(db);
}
