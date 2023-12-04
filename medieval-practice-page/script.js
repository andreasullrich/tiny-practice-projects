Vue.createApp({
  data() {
    return {
      welcomeRaiders: "Welcome Raiders",
    };
  },
}).mount("#headerapp");

Vue.createApp({
  data() {
    return {
      startsWithLetter: "",
      gameClassChars: [
        "Knight",
        "Archer",
        "Swordsman",
        "Crossbow",
        "Rogue",
        "Berserker",
      ],
    };
  },
  computed: {
    gameCharFilter() {
      if (this.startsWithLetter === "") {
        return this.gameClassChars;
      } else {
        return this.gameClassChars.filter((gameClassChar) => {
          return gameClassChar.startsWith(this.startsWithLetter);
        });
      }
    },
  },
}).mount("#app");
