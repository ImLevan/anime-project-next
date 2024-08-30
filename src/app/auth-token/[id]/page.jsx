import AuthForm from "./AuthForm"

export const metadata = {
    title: 'Auth Token',
    robots: {
        index: false,
        follow: false
    }
}

function AuthToken({ params }) {

    return (
        <div className="h-screen items-center justify-center my-[5em] mx-auto w-1/3 text-center border-zinc-950">
            <AuthForm user_id={params.id} />
        </div>
    )
}

export default AuthToken