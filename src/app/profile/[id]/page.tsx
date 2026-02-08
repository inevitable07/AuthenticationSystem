export default  async function UserProfile({params}: {params: {id: string}}) {
     const { id } = await params;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-grey-500">
            <h1>Profile</h1>
            <hr className="my-4 border-t-2 border-gray-400"/>
            <p>profile page {id} </p>
        </div>
    );
}