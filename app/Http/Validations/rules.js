const { check } = require('express-validator');

module.exports = {

    login_coach : [
        check('email').exists().withMessage("Email is required."),
        check('password').exists().withMessage("Password is required."),
    ],

    login_admin : [
        check('email').exists().withMessage("Email is required."),
        check('password').exists().withMessage("Password is required."),
    ],

    player : [
        check('name').exists().withMessage("Name is required.").isLength({ min: 3 }).withMessage("Name must be more than 2 characters."),
        check('team_id').exists().withMessage("A valid team id is required."),
    ],

    store_match : [
        check('match_name').exists().withMessage("A valid match name is required."),
        check('player_id').exists().withMessage("A valid player id is required."),
        check('is_won').exists().withMessage('Match result is required.').isBoolean().withMessage("Only boolean value is required."),
    ],

    store_team : [
        check('name').exists().withMessage("Name is required.").isLength({ min: 3 }).withMessage("Name must be more than 2 characters.")
    ],

    store_team_admin : [
        check('name').exists().withMessage("Name is required.").isLength({ min: 3 }).withMessage("Name must be more than 2 characters."),
        check('coach_id').exists().withMessage("A valid coach id is required.")
    ],

    store_coach_admin : [
        check('name').exists().withMessage("Name is required.").isLength({ min: 3 }).withMessage("Name must be more than 2 characters."),
        check('email').exists().withMessage("Email is required.").isEmail().withMessage("Provide a valid email address."),
        check('password').exists().withMessage("Password is required.").isLength({ min: 8 }).withMessage("Password must be more than 7 characters."),
    ],


}