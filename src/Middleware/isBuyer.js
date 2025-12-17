const isBuyer = (req,res,next)=>{
    try {
        if(req.user.role == 'buyer'){
            next()
        }else{
            throw new Error(`${req.user.role} can't perform this operation!`)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    isBuyer
}