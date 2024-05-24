const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
const login = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({message: 'All frields are required.'})
    }

    const foundUser = await User.findOne({username}).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({message: 'Unauthorized'})

    //Create access token
    const accessToken = jwt.sign(
        {
            'UserInfo': {
                'username': foundUser.username,
                'roles': foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '10min'} // in production set to 10~15 min
    )

    //Create refresh token
    const refreshToken = jwt.sign(
        {
            'username': foundUser.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'} //set to 7 days
    )

    //Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: 'None', //cors-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry: set to match real time
    })

    //Send accessToken containing username and roles
    res.json({accessToken})
}

/**
 * @desc Refresh
 * @route GET /auth/refresh
 * @access Public - because access token has expired
 */
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    //Verify the token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await User.findOne({username: decoded.username})

            if (!foundUser) res.status(401).json({message: 'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1m'} // in production set to 10~15 min
            )
            res.json({accessToken})
        })
    )
}


/**
 * @desc Logout
 * @route  POST /auth/logout
 * @access Public - just to be clear cookie if exists
 */
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(204)
    // If there is a cooke, remove cookie
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.json({message: 'Cookie cleared'})

}


module.exports = {
    login,
    refresh,
    logout
}