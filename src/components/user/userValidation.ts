import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../error";

class UserValidation {
  async createUserValidation(req: Request, res: Response, next: NextFunction) {
    // first_name, last_name, email, phone, country_id, password
    try {
      const schema = Joi.object({
        first_name: Joi.string()
          .alphanum()
          .min(2)
          .message("first name must be minimum of 2 letters")
          .max(100)
          .message("first name can be of maximum 100 letters")
          .required()
          .label("First Name"),
        last_name: Joi.string().alphanum().max(100).label("Last Name"),
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .label("Email")
          .max(100),
        phone: Joi.string().min(10).max(16).required().label("Mobile Number"),

        password: Joi.string()
        .max(50)
        .required()
        .label("Password"),
        birthday: Joi.date().required().label("Birthdate"),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }

  async loginUserValidation(req: Request, res: Response, next: NextFunction) {
    // email, password
    try {
      const schema = Joi.object({
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .label("Email"),
        password: Joi.required().label("Password"),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }

  async updateValidation(req: Request, res: Response, next: NextFunction) {
    //firstname,lastname,emailId,password
    try {
      const schema = Joi.object({
        user_id: Joi.number()
        .integer()
        .required()
        .messages({
            
            'any.required': 'User ID is required',
        })
        .label("User ID"),
        first_name: Joi.string()
          .alphanum()
          .min(2)
          .message("first name must be minimum of 2 letters")
          .max(100)
          .message("first name can be of maximum 100 letters")
          .required()
          .label("First Name"),
        last_name: Joi.string().alphanum().max(100).label("Last Name"),
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .label("Email")
          .max(100),
        phone: Joi.string().min(10).max(16).required().label("Mobile Number"),

        password: Joi.string()
        .max(50)
        .required()
        .label("Password"),
        birthday: Joi.date().required().label("Birthdate"),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }

  

  

  
  
}

export default new UserValidation();
