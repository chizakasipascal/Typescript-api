import { DataTypes, Model, Optional } from "sequelize";
import connection from '../../config/dbConnect'

interface UserAttributes {
  id?: number,
  name?: string | null,
  email?: string | null,
  roleId?: number | null,
  password?: string | null,
  accessToken: string | null,
  verified: boolean | null,
  active: boolean | null,
  createdAt?: Date,
  uppdateAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;
  public accessToken!: string;
  public verified!: boolean;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly uppdateAt!: Date;
}


User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.BIGINT,
  },
  password: {
    type: DataTypes.TEXT,
  },
  accessToken: {
    type: DataTypes.TEXT,
  },
  verified: {
    type: DataTypes.BOOLEAN,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
});

export default User;