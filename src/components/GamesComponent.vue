<script setup>
</script>

<template>
    <nav>
        <ul>
            <li>
                <h4>
                    M
                </h4>
                <div>
                    <h2>
                        Decifre o filme
                    </h2>
                    <span>
                        <h3>
                            1
                        </h3>
                    </span>
                </div>

            </li>
            <li>
                <h4>
                    M
                </h4>
                <div>
                    <h2>
                        Descubra o filme
                    </h2>
                    <h3>
                        2
                    </h3>
                </div>

            </li>
            <li>
                <h4>
                    M
                </h4>
                <div>
                    <h2>
                        Descubra pela imagem
                    </h2>
                    <h3>
                        3
                    </h3>
                </div>

            </li>
            <li>
                <h4>
                    M
                </h4>
                <div>
                    <h2>
                        Quem é mais famoso
                    </h2>
                    <h3>
                        4
                    </h3>
                </div>

            </li>
            <li>
                <h4>
                    M
                </h4>
                <h2>
                    Acerte pelo elenco
                </h2>
                <h3>
                    5
                </h3>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav ul {
    display: flex;
    justify-content: center;
}

nav ul li {
    background-color: black;
    width: 15vw;
    height: 35vh;
    color: white;
    box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
    margin: 1vw 1.5vw 1vw 1.5vw;
    border-radius: 14px;
}


nav ul li h2 {
    font-size: 1.5vw;
    font-weight: bold;
    margin-left: 0.5vw;
    margin-top: 1vw;
    width: 90%;
}

nav ul li h3 {
    font-size: 12vw;
    font-weight: bold;
    color: rgb(48, 45, 45);
    text-shadow:
        -2px -2px 0 #FFE100,
        2px -2px 0 #FFE100,
        -2px 2px 0 #FFE100,
        2px 2px 0 #FFE100;
    font-family: 'Outfit', sans-serif;
    color: black;
    font-family: 'Inter', sans-serif;
    position: relative;
    right: 3vw;
    bottom: 1vw;
    user-select: none;
}

nav ul li span h3 {
    top: 1.5vw;
}
</style>