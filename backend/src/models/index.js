import { Sequelize, DataTypes, Op, sequelize } from "../database/dbConfig.js";

// import associations from "./associations/index.js";

import User from "./userModel.js";
import Audio from "./audioModel.js";
import Diagnosis from "./diagnosisModel.js";
import Plant from "./plantModel.js";
import Report from "./reportModel.js";
import Upload from "./uploadModel.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.Op = Op;

db.User = User(sequelize, Sequelize, DataTypes);
db.Audio = Audio(sequelize, Sequelize, DataTypes);
db.Diagnosis = Diagnosis(sequelize, Sequelize, DataTypes);
db.Plant = Plant(sequelize, Sequelize, DataTypes);
db.Report = Report(sequelize, Sequelize, DataTypes);
db.Upload = Upload(sequelize, Sequelize, DataTypes);

// associations(db);

export default db;
