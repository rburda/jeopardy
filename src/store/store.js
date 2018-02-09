export function createInitialState() {
  return {
    categories: ['Events', 'Skills', 'Famous Gymnasts', 'Difficulty',
      'Judging', 'Random'].map((v, i) => {
      return {
         id: i,
         name: v,
         questions: [...Array(5).keys()].map((qv, qi) => {
           return {
             id: (qi+1)*(i+1),
             text: "What event requires socks?",
             value: (qi+1)*100,
             isDailyDouble: false,
             used: false
           };
         }) 
      };
    }),
    players: [...Array(3).keys()].map((pv, pi) => {
      return {
        name: (pi === 0 ? "Avery": "Caleb"),
        score: 0
      };
    }),
    gameState: {
      status: "inprogress",
      view: "gameBoard"
    }
  };
}