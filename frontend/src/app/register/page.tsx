import Link from "next/link";
import AuthForm, { type FormField } from "@/components/AuthForm";

const registerField: FormField[] = [
    {
        id: 'username',
        name: 'username',
        type: 'text',
        placeholder: "Username",
        required: true,
    },
    {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: "Email",
        required: true,
    },
    {
        id: 'password1',
        name: 'password1',
        type: 'password',
        placeholder: 'Password',
        required: true,
    },
    {
        id: 'password2',
        name: 'password2',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
    },
];

const RegisterFooter = (
    <>
        <p className= "mt-6 text-center text-sm text-[#AD8989]">
            Already have an account?{' '}
            <Link href= "/login">
                <span className= "font-medium text-blue-500 hover:text-blue-600 hover:underline cursor-pointer">
                    Login
                </span>
            </Link>
        </p>
    </>
);

export default function RegisterPage() {

    const handleRegister = async (data: Record<string, string>) => {
        "use server";
        console.log('Register info', data)
        //Call API here
    };

    return (
        <main className= "flex-grow flex flex-col items-center justify-center p-4">
            <div className= "text-center mb-6">
                <h1 className= "text-3xl font-bold text-[#AD8989]">
                Welcome to DevShare Lite!
                </h1>
                <p className= "mt-2 text-sm text-[#AD8989]">
                    A Platform for everyone to share about IT related topic
                </p>
            </div>

            <AuthForm
                title = "Register"
                fields = {registerField}
                buttonText= "Register"
                onSubmit= {handleRegister}
                footerContent= {RegisterFooter} />
        </main>
    );
}