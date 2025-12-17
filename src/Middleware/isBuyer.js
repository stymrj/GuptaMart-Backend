const isBuyer = (req,res,next)=>{
    try {
        if(req.user.role == 'buyer'){
            next()
        }else{
            throw new Error('Invalid Operation')
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    isBuyer
}