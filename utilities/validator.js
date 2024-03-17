const { body, validationResult } = require('express-validator')

const artistValidationRules = () => {
  return [
    // firstname cant be empty or below 2 chars
    body('firstName')
    .notEmpty().withMessage('the field firstName cannot be empty')
    .isLength({ min: 2 }).withMessage('The field firstName must have at least 2 characters'),
   // firstname cant be empty or below 2 chars
   body('lastName')
   .notEmpty().withMessage('the field lastName cannot be empty')
   .isLength({ min: 2 }).withMessage('The field lastName must have at least 2 characters'),
  // yearOfBirth cant be empty or below 2 chars
  body('yearOfBirth')
  .notEmpty().withMessage('the field yearOfBirth cannot be empty')
  .isLength({ min: 4, max: 4 }).withMessage('The field yearOfBirth must have valid'),   
   // country cant be empty or below 2 chars
   body('country')
   .notEmpty().withMessage('the field country cannot be empty'),
   // sex cant be empty or below 2 chars
   body('sex')
   .notEmpty().withMessage('the field sex cannot be empty'),
  ]
}

const artworkValidationRules = () => {
    return [
      // title cant be empty or below 2 chars
      body('title')
      .notEmpty().withMessage('the field title cannot be empty')
      .isLength({ min: 2 }).withMessage('The field title must have at least 2 characters'),
     // period cant be empty or below 2 chars
     body('period')
     .notEmpty().withMessage('the field period cannot be empty')
     .isLength({ min: 2 }).withMessage('The field period must have at least 2 characters'),
    // year cant be empty or below 2 chars
    body('year')
    .notEmpty().withMessage('the field year cannot be empty')
    .isLength({ min: 4, max: 4 }).withMessage('The field year must have valid'),   
     // type cant be empty or below 2 chars
     body('type')
     .notEmpty().withMessage('the field type cannot be empty'),
     // file cant be empty or below 2 chars
     body('file')
     .notEmpty().withMessage('the field file cannot be empty'),
    ]
  }

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    artistValidationRules,
    artworkValidationRules,
    validate,
}