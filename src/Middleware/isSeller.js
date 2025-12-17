const isSeller = (req,res,next)=>{
    try {
        if(req.user.role == 'seller'){
            next()
        }else{
            throw new Error('Invalid Operation')
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    isSeller
}