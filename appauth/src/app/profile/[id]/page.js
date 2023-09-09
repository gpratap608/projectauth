export default function userProfile({params}){
    return(
        <main>
            <h1>Profile</h1>
            <hr/>
            <p>Profile page {params.id} </p>
        </main>
    )
}