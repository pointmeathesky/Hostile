import prisma from "../../db"

import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export async function POST (request: Request, res)  {
   const formData = await request.formData()
    const name = formData.get('Username')

    console.log(name)
    const user = await prisma.user.findUnique({
        where: {
            username: formData.get('Username')
        }
    });
    console.log(user)

    if(user){
        const isValid = await comparePasswords(formData.get('Password'), user.password);

        if(!isValid) {
            res.status(401);
            res.send("Invalid username or password");
            return;
        }
    }
    else{
        res.status(401);
        res.send("Invalid username or password");
        return;
    }

    const token = createJWT(user);
    const cookieStore = cookies()
    cookies().set('user', user.username)
    cookies().set('token', token, {secure: true})

    redirect("/profile");



    // res.cookie('token', token)
    // res.cookie('user', user.username )
    // res.json({token});
    // redirect("/profile")
}