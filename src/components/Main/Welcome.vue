<template>
    <div id="welcome-body">
        <h2>This is Overstep Champions.</h2>
        <p>Overstep Champions is a character management app for the table-top RPG Overstep.</p>
        <p>The Champion Builder walks you through the process of creating a Champion. The process traces the following steps:</p>
        <ol>
            <li>Level</li>
            <li>Role</li>
            <li>Source</li>
            <li>Starting at level 6, Intersection</li>
            <li>Name</li>
            <li>Background</li>
            <li>Exposition</li>
            <li>Starting at level 4, Non-Damage Proficiencies.</li>
            <li>Skills</li>
        </ol>
        <p>To save Champions to return to later, log in using Google Sign-In.</p>
    </div>
</template>
 
<script>
export default {
    name: 'Welcome',
    props: {
    }
}
</script>
 
<style scoped>

#welcome-body {
    padding: 10px 5px;
}

h2 {
    padding: 5px 0;
}

p {
    padding: 7px 0;
}

ol {
    padding-top: 7px;
    padding-bottom: 7px;
}

</style>
 
 

