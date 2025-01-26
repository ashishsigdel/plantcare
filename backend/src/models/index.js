import { Sequelize, DataTypes, Op, sequelize } from "../config/dbConfig.js";

import associations from "./associations/index.js";

import User from "./userModel.js";
import Report from "./reportModel.js";
import Upload from "./uploadModel.js";
import Audio from "./audioModel.js";
import Diagnosis from "./diagnosisModel.js";
import DiseaseCure from "./diseaseCureModel.js";
import DiseaseDescription from "./diseaseDescriptionModel.js";
import Disease from "./diseaseModel.js";
import DiseaseSymptom from "./diseaseSymptomsModel.js";
import DiseasePrevention from "./disesasePreventionModel.js";
import Plant from "./plantModel.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.Op = Op;

db.User = User(sequelize, Sequelize, DataTypes);
db.Report = Report(sequelize, Sequelize, DataTypes);
db.Upload = Upload(sequelize, Sequelize, DataTypes);
db.Audio = Audio(sequelize, Sequelize, DataTypes);
db.Diagnosis = Diagnosis(sequelize, Sequelize, DataTypes);
db.DiseaseCure = DiseaseCure(sequelize, Sequelize, DataTypes);
db.DiseaseDescription = DiseaseDescription(sequelize, Sequelize, DataTypes);
db.Disease = Disease(sequelize, Sequelize, DataTypes);
db.DiseaseSymptom = DiseaseSymptom(sequelize, Sequelize, DataTypes);
db.DiseasePrevention = DiseasePrevention(sequelize, Sequelize, DataTypes);
db.Plant = Plant(sequelize, Sequelize, DataTypes);

associations(db);

export default db;
