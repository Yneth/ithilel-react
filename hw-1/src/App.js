import {useState} from "react";

function App() {
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'Stepan',
        age: 25
    });

    const userInfoToggleButtonHandler = () => {
        setUserInfoVisible(!userInfoVisible);
        setUserInfo({name: 'Mykola', age: 30});
    }

    return (
        <main>
            <section>
                {userInfoVisible && <p>Name: {userInfo.name}, age: {userInfo.age}</p>}

                <button onClick={userInfoToggleButtonHandler}>
                    {userInfoVisible ? 'Hide' : 'Show'}
                </button>
            </section>
        </main>
    );
}

export default App;
