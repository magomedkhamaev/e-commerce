import jvt from 'jsonwebtoken';

export default  (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if (token) {
       try {

        const decoded = jvt.verify(token, 'secret123');

        req.userId= decoded._id;
        next();
       } catch (e) {
        return res.status(403).json({
            message: 'not dostupa'
           });
       }
    }
    else {
       return res.status(403).json({
        message: 'not dostupa'
       });
    }
    
}
