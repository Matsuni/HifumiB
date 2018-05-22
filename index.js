const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const fs = require("fs");

const TOKEN = "MzkwMTAzMTMyODE1ODg0Mjky.DRxEIA.VB6EbSKDDHw1ju0eATa-Nnr_X8U";//Isto permite que o bot se ligue ao Discord
const PREFIX = "H_";//Forma de chamar o bot

function play(connection, message) {//ignora isto por agora
	var server = servers[message.guild.id];
	
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
	
	server.queue.shift();
	
	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}

let points = JSON.parse(fs.readFileSync("./userPoints.json", "utf8"));//Aqui chamamos o ficheiro que vamos utilizar para guardar pontos



var Ball = [
	"Y-Yes!",
	"N-No!",
	"M-Maybe! ¯ \\\ _ (ツ) _ / ¯",
	"O-OF COURSE!",
	"N-NO! NO!",
	"P-Please ask again..."
];
var Dice = [
	1,
	2,
	3,
	4,
	5,
	6
];
var Song = [
	"*♪ Mankai STEP BY STEP de susume! STEP BY STEP, tobidase!~ ♪* (づ^□^)づ",
	"*♪ Wuss poppin Jimbo!~ ♪* (づ^□^)づ",
	"*♪ Hashire sori yo, kaze no you ni, Tsukimihara wo padoru padoru ~ ♪*(づ^□^)づ",
	"*♪ It's everyday bro! ~ ♪*(づ^□^)づ",
	"*♪ Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang ~ ♪*(づ^□^)づ",
	"*♪ Step on up to plaaate, 'cause this ain't no game. It's time to make history yeeeeeaaahh ~ ♪*(づ^□^)づ",
	"*♪ So can you feel the jazz? Of the beautiful ballad. How about tango or maybe some rock'n'roll? ~ ♪*(づ^□^)づ"
];
var Master = [
	"Y-Yes!",
	"I am s-sorry... b-b-but I'll refuse",
	"I-I am not sure...",
	"A-Are you sure you're not evil?"
];
var jojo = [
	"D-Do I have to---? OR-**ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA!!!! (>﹏>)**",
	"I-I refuse! (>﹏>)"
];
var Cute = [
	"https://k60.kn3.net/taringa/2/4/6/9/5/3/28/jav73r/A20.jpg",
	"https://static.zerochan.net/Takimoto.Hifumi.full.2127502.jpg",
	"http://i1.bvimg.com/522757/88f9367b97cf76c2.jpg",
	"https://pbs.twimg.com/media/DLeLQaLXkAEwZja.jpg",
	"https://2ch.hk/dev/src/2085202/15112552105690.jpg",
	"https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/19984955_474335892913429_5452967169937637376_n.jpg",
	"http://nijifeti.com/wp-content/uploads/2017/10/witch7-24.jpg",
	"https://www.wykop.pl/cdn/c3201142/comment_wOadjznDcgtjAixALsEuLZfLsaHpj7GV.jpg",
	"https://pbs.twimg.com/media/CrVg81cUEAMbQ_3.jpg",
	"http://situero.com/wp-content/uploads/65904041408201738.jpg",
	"https://i.imgur.com/o0V2Syy.png",
	"https://pbs.twimg.com/media/DI-qHXIV4AAwpPL.png",
	"https://cdn.awwni.me/wrr9.png",
	"https://rrd.2chin.net/may/b/src/1501071893243.jpg",
	"http://i.imgur.com/YxzmTc0.png",
	"https://gs.smuglo.li/file/a925a218a4d4da8e3bd1fb302ab70435c6efed496c9d8537bed4bf910317d517.jpg",
	"https://78.media.tumblr.com/d16ecc035680f3ab0ce177ab9494f16e/tumblr_okeea93OsP1u77y57o5_1280.png",
	"https://i.pinimg.com/originals/b4/6c/b9/b46cb9d33af2cd4684effd7c7947e2c0.jpg",
	"https://hentai.fyi/170918/15.jpg",
	"https://i.imgur.com/FfaVKkg.jpg",
	"https://i.imgur.com/xjcz3di.png"
];
var X = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10
	];
var bot = new Discord.Client();
var night = "0";

var servers = {};

bot.on("ready", function(message) {
	console.log("Ready");
	bot.user.setGame("H_Help for help");

});

bot.on('guildMemberAdd', member => {
    	member.guild.channels.get('377126236675244035').send('**' + member.user.username + '** has joined the server!'); 
});

bot.on("message", function(message) {//Aqui é que o bot começa a trabalhar com o "bot.on", depois usamos a fucntion message para indicar que queremos que o bot envie mensagens 

	if (message.author.equals(bot.user)) return;//se quem chamou um bot foi outro bot então ele vai parar.
	
	if(message.content.startsWith("u mom gay")) {
		message.channel.sendMessage("No u");}
	
	if (!message.content.startsWith(PREFIX)) return;//se a mesnagem não conter o Prefix então ele tambem vai parar
	
	let command = message.content.split(" ")[0];
	command = command.slice(PREFIX.length);
	
	let args = message.content.split(" ").slice(1);//Basicamente o Prefix ja não vai fazer parte dos args[]. Os args[] são as palavras que existem na mensagem. Com isto em conta sabemos agora que a mensagem só começa depois do Prefix
	
	if (!message.content.startsWith(PREFIX)) return;
	if (message.author.bot) return; // always ignore bots!
	
	

  // if the points don"t exist, init to 0;
	if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 1
  };
  let userData = points[message.author.id];
  userData.points++;
  let curLevel = Math.floor(0.9 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(" W-WITH MY MAGIC I CAN LEVEL YOU UP TO LEVEL "+ curLevel+"! (∩ᗒᗜᗕ)⊃━☆ﾟ.*");
  }
  fs.writeFile("./userPoints.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });//este é um codigo de pontos que encontrei... "WHO DID THIS"
		
	switch (command.toLowerCase()){//aqui começamos um case que em java é Switch
			
			case "help"://Agora o bot vai verificar qual é a palavra que vem logo depois do Prefix e executar a sua função
				message.delete();
				message.author.sendMessage("I-I am here to help you!!");//message.author.sendMessage = O bot vai enviar uma mensagem privada para o autor da mensagem 
				var embed = new Discord.RichEmbed()
					.addField("H_Hi", "I say Hi!")//O addField permite que adicionemos um titulo e descrição ex: add.Field("Titulo","Descrição")
					.addField("H_Goodnight", "I say Goodnight!")
					.addField("H_JojoReference", "Random Jojo Reference")
					.addField("H_Thanks OR H_ThankYou", "You are welcome")
					.addField("H_Sorry", "No problem")
					.addField("H_NoticeMe", "I'll notice you")
					.addField("H_SendNudes", "NO!!")
					.addField("H_OmaeWaMouShindeiru", "N-N---")
					.addField("H_Enough", "Meme")
					.addField("H_AobaIsTrash", "HOW DARE YOU?!")
					.addField("H_Pat", "Give someone a comfy pat!")
					.addField("H_Delet", "Politely ask someone to delete their message!")
					.addField("H_Reverse", "Use this when someone tries to roast you!")
					.addField("H_Cute", "I'll post a cute image from me! (You need to be lvl 3 to ask for this command!)")
					.addField("H_DidYouDoIt?", "Just a meme...")
					.addField("H_8ball", "Only questions that I can answer with Yes or No.")
					.addField("H_Sing", "I'll sing a song! (You need to be lvl 2 to ask for this command!) ")
					.addField("H_RollDice", "Let's play a dice game!")
					.addField("H_AreYouMyMaster?", "I'll tell you if I accept being your Master!")
					.addField("H_Poem", "Write a poem and I'll post it in the chat!")
					.addField("H_Vs", "Please don't fight!")	
					.addField("H_MyLevel", "I'll tell your current HifumiLevel and HifumiPoints!")
					.setColor(132344)
					.setThumbnail(message.author.avatarURL)
				message.author.sendEmbed(embed);
				break;//depois de terminar uma função colocamos sempre o break para que este pare
			case "hi":
				message.channel.sendMessage("H-H-Hello!! (づ｡◕‿‿◕｡)づ");//message.channel.sendMessage = Queremos enviar uma mensagem de onde o bot foi chamado
				break;
			case "hello":
				message.channel.sendMessage("H-H-Hello!! (づ｡◕‿‿◕｡)づ");//message.channel.sendMessage = Queremos enviar uma mensagem de onde o bot foi chamado
				break;
			case "howdy":
				message.channel.sendMessage("H-H-Hello!! (づ｡◕‿‿◕｡)づ");//message.channel.sendMessage = Queremos enviar uma mensagem de onde o bot foi chamado
				break;
			case "goodnight":
				if (night == "1") message.channel.sendMessage("G-Goodnight (~˘▾˘)~");
				else message.channel.sendMessage( "I-Isn't it a little early for that?");
				break;
			case "jojoreference":
				message.channel.sendMessage(jojo[Math.floor(Math.random() * jojo.length﻿)]);
				break;
			case "thanks":
				message.channel.sendMessage("Y-Y-YOU'RE.. welcome (づ｡◕‿‿◕｡)づ");
				break;
			case "thankYou":
				message.channel.sendMessage("Y-Y-YOU'RE.. welcome (づ｡◕‿‿◕｡)づ");
				break;
			case "sorry":
				message.channel.sendMessage("**W-W-WHY ARE YOU APOGOLIZING!?** I-it's okay...");
				break;
			case "noticeme":
				message.channel.sendMessage(message.author.toString() + " H-HI!! H-How are you?!");//message.author.toString()= Estamos a fazer uma menção ao autor da mensagem
				break;
			case "aobaistrash":
				message.channel.send("F-F-FIGHT ME (ง'̀-'́)ง", {file:﻿"https://i.pinimg.com/564x/4f/e7/57/4fe757295290a601789ceee9f7119dca.jpg"});
				userData.points= userData.points - 5;
				break;
			case "sendnudes":
				message.channel.sendMessage("***N-N-N-NO!! T-THAT'S LEWD!! O///O ***");
				break;
			case "omaewamoushindeiru":
				message.channel.sendMessage("...eh...y-you mean---N-***NANI!!***");
				break;
			case "didyoudoit?":
				message.channel.send("Y-You know I had to... d-do it to them...", {file:"https://i.imgur.com/in3rt4J.png"});
				break;
			case "enough":
				message.channel.send("a-aa....***AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!***");
				break;
			case "cute":
				if (userData.level > 2) message.channel.send(" ", {file:Cute[Math.floor(Math.random() * Cute.length﻿)]});
				else message.channel.sendMessage("I-I am sorry... You must be higher than level 2 for that command.");
				break;
			case "smile":
				message.channel.send("I-I-I'll p-pay y-y-you...d-don't m-make me do t-this...! (ᗒ﹏ᗕ)", {file:﻿"https://pbs.twimg.com/media/CnMW3h0XYAA2V9D.jpg"});
				break;
			case "8ball":
				if (args[1]) message.channel.sendMessage(Ball[Math.floor(Math.random() * Ball.length﻿)]);//Aqui esta a função do random
				else message.channel.sendMessage("Y-You need to tell me something with that command");
				break;
			case "sing":
				if (userData.level > 1) message.channel.sendMessage(Song[Math.floor(Math.random() * Song.length﻿)]);
				else message.channel.sendMessage("I-I am sorry... You must be higher than level 1 for that command.");
				break;
			case "mylevel":
				userData.points= userData.points - 1;
				var embed = new Discord.RichEmbed()
					.addField("Level: ", userData.level)
					.addField("HifumiPoints: ", userData.points)
					.setColor(132344)
					.setThumbnail(message.author.avatarURL)
				message.channel.sendEmbed(embed);
				break;
			case "rolldice":
				var x = 0;
				var i = 0;
				var j = 0;
				var sumP = 0;
				var sumH = 0;
				if(!args[0]) {
					message.channel.sendMessage("I-In this game both of us will roll a-a dice 3 times... and then... O-OH! And then we sum the numbers and the greatest number wins...! To start type !HRollDice Play... good luck!");
					return;
				}
				if (args[0] == "Play") {
					while (x < 3){
					i = Dice[Math.floor(Math.	random() * Dice.length﻿)];
					message.channel.sendMessage(message.author.toString()+": "+i);
					j = Dice[Math.floor(Math.	random() * Dice.length﻿)];
					message.channel.sendMessage("Hifumi: "+j);
					sumP = sumP + i;
					sumH = sumH + j;
					x = x+1;
					}
					message.channel.sendMessage(message.author.toString()+"'s total: "+sumP+" points");
					message.channel.sendMessage("Hifumi's total: "+sumH+" points");
					if (sumP > sumH) message.channel.sendMessage("Y-You win with "+sumP+" points... congrats!");
					if (sumP<sumH) message.channel.sendMessage("I-I win with "+sumH+" points... ye!");
					if (sumP ==sumH)message.channel.sendMessage("I-It looks like...I-It's a tie");
				}
				else message.channel.sendMessage("Y-You need to type Play...!");
				break;
			case "100game":
				var player = 1;
				var total = 0;
				var n =0;
				if (!args[0]) {
					message.channel.sendMessage("A-alright, here are the rules: each player will say a number from 1 to 10 in turns, and the numbers will add up. The first one to reach 100 wins!");
					return;
				}
				if (args[0] == "Play") {
       					const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        				console.log(collector)
        				collector.on('collect', message => {
					n = message.content;
           				if ((n>=1) && (n<=100)) {
						n = Number(n);
						total=total + n;
						if (player == 2) {player = 1;}
						else{player = 2;}
							message.channel.send("It's your turn Player"+player+"! Total:"+total+".");
           					} else{
               						message.channel.send("Invalid");
							return;
							}
       						})
					if(total >= 100){
						message.channel.send("Player "+player+" wins!");
						}
					
						
				}
				break;
			case "areyoumymaster?": 
				message.channel.sendMessage(Master[Math.floor(Math.random() * Master.length﻿)]);
				break;
			case "areyoumymaster":
				message.channel.sendMessage(Master[Math.floor(Math.random() * Master.length﻿)]);
				break;
			case "poem":
				message.delete();
				if(!args[5]) {// aqui vamos verificar se existe mais que uma palavra no poema ex: H_Poem Nibba(args[0]) Boi(args[1]) 
					message.channel.sendMessage("P-Please, send me a poem and I will save it in the chat...!");
					return;
				}
				var embed = new Discord.RichEmbed()
					.addField("Poem time",args.join(" "))//Aqui vamos juntar todos os args[] e separalos por um espaço
					.setColor(132344)
				message.channel.sendEmbed(embed);
				break;
			case "vs":
				if(!args[0]) {
					message.channel.sendMessage("P-Please, tell who you wish to fight! ...i-i don't like fighting...");
					return;
				}
				var vs = [
					message.author.toString(),
					args[0]
				];
				var embed = new Discord.RichEmbed()
					.setDescription(message.author.toString() + " VS. " + args[0])
					.setColor(132344)
				message.channel.sendEmbed(embed);
				message.channel.sendMessage(vs[Math.floor(Math.random() * vs.length﻿)]+" wins! ... Now... p-please stop fighting (ᗒ﹏ᗕ)");
				break;
			case "pat": 
				message.delete();
				args[0] = message.guild.member(message.mentions.users.first()); 
				if (args[0]) message.channel.send(args[0] + " gets a comfy pat!", {file:﻿"https://images5.alphacoders.com/837/837553.png"});
				else{ 
					message.channel.send("Y-You need to tell me who to pat!");
					userData.points= userData.points - 1;
				}	
				break;
			case "delet":
				message.delete();
				args[0] = message.guild.member(message.mentions.users.first());
				if (args[0]) message.channel.send("D-DELETE THIS "+args[0], {file:﻿"https://i.imgur.com/xga6glR.jpg"});
				else message.channel.send("D-DELETE THIS !", {file:﻿"https://i.imgur.com/xga6glR.jpg"});
				userData.points= userData.points - 1;
				break;
			case "reverse":
				message.delete();
				message.channel.send({file:﻿"https://i.imgur.com/DdYo9Lq.jpg"});
				break;
			case "play":
				if(!args[1]) {
					message.channel.sendMessage("I-I need a link... please...!");
					return;
				}
				
				if(!message.member.voiceChannel){
					message.channel.sendMessage("P-Please... enter a Voice Channel first...!");
					return;
				}
				
				if (!servers[message.guild.id]) servers[message.guild.id] = {
					queue: []
				};
				
				var server = servers[message.guild.id];
				
				server.queue.push(args[0]);
				
				if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
					play(connection, message);
				});
				break;
			case "skip":
				var server = servers[message.guild.id];
				
				if (server.dispatcher) server.dispatcher.end();
				break;
			case "stop":
				var server = servers[message.guild.id];
				
				if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
				break;
			default://isto é se caso nenhum dos cases for ativado
				userData.points= userData.points - 1;
				message.channel.sendMessage("I-I'm sorry! I-I DON'T UNDERSTAND!!");
	}
	  
	 
});


bot.login(TOKEN);
