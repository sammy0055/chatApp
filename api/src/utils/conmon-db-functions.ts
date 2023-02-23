export const writeTODB = async (data:Object, Module:any) => {
    const registerUser = new Module(data)
    const result = await registerUser.save()
    return result._doc
}