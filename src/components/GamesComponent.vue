<script setup>
</script>

<template>
    <nav>
        <ul>
            <li>
                <h2>
                    Decifre o filme
                </h2>
                <h3>
                    1
                </h3>
            </li>
            <li>
                <h2>
                    Decifre o filme
                </h2>
                <h3>
                    2
                </h3>
            </li>
            <li>
                <h2>
                    Decifre o filme
                </h2>
                <h3>
                    3
                </h3>
            </li>
            <li>
                <h2>
                    Decifre o filme
                </h2>
                <h3>
                    4
                </h3>
            </li>
            <li>
                <h2>
                    Decifre o filme
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
    box-shadow: rgba(244, 255, 97, 0.35) 0px 5px 15px;
    margin: 1vw 1.5vw 1vw 1.5vw;
}

nav ul li h2 {
    font-size: 2.5vw;
}

nav ul li h3 {
    font-size: 12vw;
    font-weight: bold;
    color: white;
    text-shadow:
        -2px -2px 0 #FFE100,
        2px -2px 0 #FFE100,
        -2px 2px 0 #FFE100,
        2px 2px 0 #FFE100;
    font-family: 'Outfit', sans-serif;
    color: black;
    font-family: 'Inter', sans-serif;
    position: relative; /* permite mover fora do li */
    right: 3vw;
    bottom: 1vw;

}
</style>