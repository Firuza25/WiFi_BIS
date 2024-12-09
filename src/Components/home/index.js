import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Home = () => {
    const { currentUser } = useAuth()

    if (!currentUser) {
        return <div className="text-2xl font-bold pt-14">Loading...</div>
    }

    return (
        <div className="home-container">
            <div className="mt-6">
                <h2>If you don't want to look the same as in the photo, click on the "Start" button</h2>
            </div>
            <div className="flex justify-center mt-4">
                <button>
                    Start
                </button>
            </div>
            <div className="image-container mt-6">
                <img
                    src="https://avatars.dzeninfra.ru/get-zen_doc/2436983/pub_636a288aa41cd45a01cdb27c_636a2aeade009f445d13a10a/scale_1200"
                    alt="Image"
                />
            </div>
        </div>
    )
}

export default Home
