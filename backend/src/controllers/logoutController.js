const logoutController = {}
//POST (CREATE)
logoutController.logout = async (req, res) => {
    //Se borra la cookie que contiene el token para que el usuario tenga que volver a iniciar sesion
    res.clearCookie("authToken")
    res.json({message: "Sesión cerrada correctamente"})
}
export default logoutController