const isSeller = (req,res,next)=>{
    try {
        if(req.user.role == 'seller'){
            next()
        }else{
            throw new Error(`${req.user.role} can't perform this operation!`)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    isSeller
}