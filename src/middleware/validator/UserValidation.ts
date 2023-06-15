import Validator from 'validatorjs'
import { Response, Request, NextFunction } from 'express'
import Helpers from '../../helpers/Helper'
import User from '../../db/models/user'

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {
            name,
            email,
            password,
            confimerPassword,
        } = req.body;

        const data = {
            name,
            email,
            password,
            confimerPassword,
        }

        const rules: Validator.Rules = {
            "name": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:8",
            "confimerPassword": "required|same:password",
        }

        const validate = new Validator(data, rules)

        if (validate.fails()) {
            return res.status(400).send(Helpers.ResponseData(400, 'Bad request', validate.errors, null))
        }
        const user = await User.findOne({
            where: {
                email: data.email
            }
        })
        if (user) {
            const errorData = {
                errors: {
                    email: [
                        "Email is already used"
                    ]
                }
            }
            return res.status(400).send(Helpers.ResponseData(400, "Band Request", errorData, null))
        }
        next()
    } catch (error: any) {
        return res.status(500).send(Helpers.ResponseData(500, "", error, null))
    }


}
export default { RegisterValidation }