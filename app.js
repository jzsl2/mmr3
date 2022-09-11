var app = new Vue({
  el: "#app",
  data () {
    return {
      API_KEY: "RGAPI-dfc60496-6258-4ea7-86c0-e0d9042867ba",
      IconCall: "",
      data : "",
      showCard: "",
      showRank: "",
      showInGame: "",
      playerRank: "",
      rank: "",
      division: "",
      winRatio: "",
      winRatioFixed: "",
      gameStatut: "",
    }
  },

  methods: {
    
    async getPlayer() {
      this.searchText = document.querySelector(".searchText").value;
      this.APICall = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.searchText + "?api_key=" + this.API_KEY;
      const response = await fetch(this.APICall);
      this.data = await response.json();
      console.log(this.data);
      this.IconCall = "http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/" + this.data.profileIconId + ".png";
      
      this.toggleCard()
      this.toggleInGame()
      this.toggleRank()
      this.getGameStatut()
      this.getMasteries()
      this.getRank()
    },
    
    toggleCard() {
      JSON.stringify(this.data) != '{}' ? this.showCard=true : this.showCard=false;
    },
    toggleInGame() {
      JSON.stringify(this.gameStatut) != '{}' ? this.showInGame=true : this.showInGame=false;
    },
    toggleRank() {
    JSON.stringify(this.playerRank[0]) != '{}' ? this.showRank=true : this.showRank=false;
    },

   
    async getGameStatut() {
     this.GameAPI = "https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + this.data.id + "?api_key=" + this.API_KEY;
     const res = await fetch(this.GameAPI);
     this.gameStatut = await res.json();
     console.log(this.gameStatut);
    },

    async getRank() {
      this.GameAPI = "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + this.data.id + "?api_key=" + this.API_KEY;
      const response = await fetch(this.GameAPI);
      this.playerRank = await response.json();
      if (this.playerRank[0]) {
        this.showRank=true;
        if (this.playerRank[0] <= this.playerRank[1]) {
          this.playerRank[0].tier = this.playerRank[1].tier
        }
        this.rank = this.playerRank[0].tier;
        this.division = this.playerRank[0].rank;
        this.totalGames = this.playerRank[0].wins + this.playerRank[0].losses;
        this.winRatio = this.playerRank[0].wins / this.totalGames * 100;
        this.winRatioFixed = this.winRatio.toFixed(0);
        console.log(this.winRatio);
        console.log(this.rank);
        console.log(this.playerRank[0].wins);
        console.log(this.playerRank[0].losses);
  
  
  
        switch (this.division) {
          case "":
            this.division = ""
            console.log("division is null");
            break;
        
          default:
            break;
        }
        
        switch (this.rank) {
          case "IRON":
            this.rank = "assets/rankedIcons/Emblem_Iron.png"
            break;
          case "BRONZE":
            this.rank = "assets/rankedIcons/Emblem_Bronze.png"
            break;
          case "SILVER":
            this.rank = "assets/rankedIcons/Emblem_Silver.png"
            break;
          case "GOLD":
            this.rank = "assets/rankedIcons/Emblem_Gold.png"
            break;
          case "PLATINUM":
            this.rank = "assets/rankedIcons/Emblem_Platinum.png"
            break;
          case "DIAMOND":
            this.rank = "assets/rankedIcons/Emblem_Diamond.png"
            break;
          case "MASTER":
            this.rank = "assets/rankedIcons/Emblem_Master.png"
            break;
          case "GRANDMASTER":
            this.rank = "assets/rankedIcons/Emblem_Grandmaster.png"
            break;
          case "CHALLENGER":
            this.rank = "assets/rankedIcons/Emblem_Challenger.png"
            break;
          case "{}":
            this.rank = "{}"
            console.log("rank is null");
            break;
          default:
            break;
        }
      }else {
        this.showRank=false;
        console.log("no ranked");
      }
    },

    async getMasteries() {
      this.championID = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + this.data.id + "?api_key=" + this.API_KEY;;
      const res = await fetch(this.championID);
      this.champMasteries = await res.json();

      this.champ1 = this.champMasteries[0].championId;
      this.champ1lvl = this.champMasteries[0].championLevel;
      this.champ2 = this.champMasteries[1].championId;
      this.champ2lvl = this.champMasteries[1].championLevel;
      this.champ3 = this.champMasteries[2].championId;
      this.champ3lvl = this.champMasteries[2].championLevel;

      console.log(this.champ1);

      this.masteriesAPI = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + this.data.id + "/by-champion/" + this.champ1 + "?api_key=" + this.API_KEY;

      console.log(this.masteriesAPI);

      // http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json
      // http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/Aatrox.png
    },
  },
});


