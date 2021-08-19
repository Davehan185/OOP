class Room {
    constructor(name, story, description, ste, event) {
        this._name = name //duh
        this._story = story; // an event that triggers when you 1st enter the room, normally sets the scene
        this._description = description; // location description, normally "You are in the [room name]"
        this._state = ste // Room state = [0: is not yet introduced, has not yet had its [Room(story)] triggered)], [1: A room that has been revealed by the player] [2: Triggered by another condition, this room now has a diffrent story to trigger Room[event]. This is normally empty] [3: and inplay state of a room that has had its event already trigger]
        this._linkedRooms = {}; // Rooms linked with this room
        this._event = event // Event triggered on entering the room with a state of 2, these are special rooms that has had something else effect them.
        this._linkedObject = []; // Other Object linked with this room, enemies or items
        this._linkedCharcter = [];
        
    }

    get story() {
        return this._story;
    }

    get description() {
        return this._description;
    }

    tellDescription() {
        return this._description;
    }

    tellStory() {
        if (this._state == 0) {
            this._state = 1
            return this._story
        } else if (this._state == 2) {
            this._state = 1
            return this._event
        } else {
            return "You have been here before"
        }
        
    }

    

    tellRoomLinks() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
        let text = "</br> " + "You can go " + direction + " to the " + room._name;
        details.push(text);
        }
        return details;
    }

    tellObjectLinks() {
        let details = []
        this._linkedObject.map((object) => {
            console.log(object)
            let text = "</br> " + "You can inspect the " + object.name;
            details.push(text);
        })
        return(details)
    }

    tellCharcterLinks() {
        console.log(this._linkedCharcter)
        let details = []
        this._linkedCharcter.map((char) => {
            console.log(char)
            let text = "</br> " + "You can interact with " + char.name;
            details.push(text);
        })
        return(details)
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    linkCharacter(characterToLink) {
        this._linkedCharcter = [...this._linkedCharcter, characterToLink]
    }

    linkObject(objectToLink) {
        this._linkedObject = [...this._linkedObject, objectToLink]
    }



    moveRooms(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way")
            return this;
        }

    }
}

class Charcter {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    describe() {
        return this._description;
    }
}

class Enemy extends Charcter {
    constructor(name, description, weakness) {
        super(name, description);
        this._weakness = weakness;
    }

    fight(item) {
        if (item = this._weakness) {
            return true;
        } else {
            return false;
        }
    }
}

class Item {
    constructor(nam, ste, loc, des, ins) {
        this.name = nam; //Item name
        this.state = ste; // Item state = [0: is out-of-play (destroyed or not yet introdced)], [1: is somewhere in the game world, but not yet found by the player] [2: has been handled by the player—e.g. taken and then dropped] [3: is carried by the player]
        this._location = loc // Item Start Location
        this._description = des
        this.inspect = ins
    }

    describeItem () {
        if (this._state == 0) {
            return this._description + "This item has been destroyed (or not appeared in the game yet).";
        }
        if (this._state == 1) {
            return this._description + "This item is somewhere in the game world, but you haven't found it, yet.";
        }    
        if (this._state == 2) {
            return this._description + "You have handled (but are not carrying) this item";
        }
        if (this._state == 3) {
            return this._description + "You are carrying this item";
        }
    };

    // moveItem (item) {
    //     if (item in this._linkedRooms) {
    //             return this._linkedRooms[direction];
    //     } else {
    //         alert("You can't go that way")
    //         return this;
    //     }
    // }
};

// Outside
const Outside = new Room("Outside", "The forest was dark and damp, the sky was black as ink and the trees swayed in the breeze. Your friend has gone missing, he was searching around where you had laid camp, investigating the strange noices that seemed to be coming from all directions. You heard his scream and decided to run towards the only light sorce you could see. As you approach you see a large clearing, the grounds for a large house. Feeling the presence of something chasing you, you decide to run to the house, maybe there will be something or someone there who can help you get out of this alive", "You are Outside....", 0, "")

// Ground Floor
const Lobby = new Room("lobby", "The door slams shut behind you with a thud, you check the door but it has locked behind you. The House is very old, the floor of the Lobby has a black and white chess board pattern and feels cold underfoot, where you entered there is a circle with a pentagon shape inside drawn in red paint. A few pictures line the walls all of them showing rugged men, not the type of people you would expect to own a house like this, you can hear a faint scraching ", "You are in the Lobby....", 0,"")
const Kitchen = new Room("Kitchen", "The cold chessboard floor follows into this room from the lobby. There are pots and pans pilled up, they have been used and judging by the smell a long time ago.", "You are in the Kitchen...", 0, "")
const LivingRoom = new Room("LivingRoom", "You enter an old fashioned living room, it looks cozy with a sitting area and a small desk at the back of the room to work from. The centre piece is a large fireplace", "You are in the Living Room...", 0, "")

// Stairs
const Stairs = new Room("Stairs", "The stairs twist back on them selves before reaching the next level, as you assend the stairs the scraching sound you could hear from downstairs gets louder...", "You are on the stairs...", 0, "")

// First Floor
const MasterBed = new Room("Master Bedroom", "Master Bedroom", "You are in the Master Bedroom...", 0, "")
const Gamesroom = new Room("Games Room", "Games Room", "you are in the Games Room...", 0, "")
const Bathroom = new Room("Bathroom", "Bathroom", "You are in the Bathroom...", 0, "")
const Landing = new Room("Landing", "Climbing to the top of the stairs you see a human shaped figure clawing at one of the doors. You are abouts to call out to them but then realise that something is off, there focus is soley on the door and they seem almost desperate to get through, there complexion is dull and you get the smell of rotting meat", "You are on the Landing...", 0, "")
const ChildsBed = new Room("Child's Bedroom", "Child's Bedroom", "You are in the Child's Bedroom..", 0, "")

// Stairs
const CellarStairs = new Room("Cellar Stairs", "Cellar Stairs", "You are using the Cellar Stairs...", 0, "")

//Basement
const Cellar = new Room("Cellar", "Cellar", "You are in the Cellar...", 0, "")
const Armoury = new Room("Armoury", "Armoury", "You are in the Armoury...", 0, "")
const Cell = new Room("Cell", "Cell", "You are in the Cell..", 0, "")
const Chapel = new Room("Chapel", "Chapel", "You are in the Chapel", 0, "")


// Charcters
const Clive = new Enemy("Clive the zombie", "A slow moving decaying corpse", "Knife")

// Items
const def = new Item("","0","","","")
const Knife = new Item("Knife", "0", Kitchen, "a sharp blade", "has a very sharp edge could be used for cutting meat")



//Ground Floor Links
Outside.linkRoom("north", Lobby)

Kitchen.linkRoom("lobby", Lobby);
Lobby.linkRoom("north", Kitchen);
LivingRoom.linkRoom("lobby", Lobby);
Lobby.linkRoom("east", LivingRoom);
LivingRoom.linkRoom("north", Kitchen)
Kitchen.linkRoom("south", LivingRoom)

//Upstairs Floor Links

Landing.linkRoom("north", MasterBed)
Landing.linkRoom("south", Gamesroom)
Landing.linkRoom("east", Bathroom)
Landing.linkRoom("west", ChildsBed)

MasterBed.linkRoom("landing", Landing)
Gamesroom.linkRoom("landing", Landing)
Bathroom.linkRoom("landing", Landing)
ChildsBed.linkRoom("landing", Landing)

ChildsBed.linkRoom("south", Gamesroom)
Gamesroom.linkRoom("north", ChildsBed)

MasterBed.linkRoom("east", Bathroom)
Bathroom.linkRoom("west", MasterBed)

//Basement Floor Links

Cellar.linkRoom("south", Armoury)
Cellar.linkRoom("east", Chapel)
Armoury.linkRoom("north", Cellar)
Chapel.linkRoom("west", Cellar)
Armoury.linkRoom("east", Cell)
Cell.linkRoom("west", Armoury)


//Links Between Floors

Lobby.linkRoom("upstairs", Stairs);
Stairs.linkRoom("downstairs", Lobby);

Stairs.linkRoom("upstairs", Landing)
Landing.linkRoom("downstairs", Stairs)

Cellar.linkRoom("downstairs", CellarStairs);
CellarStairs.linkRoom("upstairs", Cellar);

Kitchen.linkRoom("upstairs", CellarStairs);
CellarStairs.linkRoom("downstairs", Kitchen);

//Character linked

Landing.linkCharacter(Clive)


//Items linked

Kitchen.linkObject(Knife)


function displayRoomInfo(room) {
    textContent = room.tellDescription();

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("ui").focus;

}

function displayRoomStory(room) {
    storyContent = room.tellStory();
    document.getElementById("storyarea").innerHTML = storyContent;
}

function examineRoom(room) {
    linkedRoom = room.tellRoomLinks();
    document.getElementById("roomsarea").innerHTML = linkedRoom;


    linkedCharcter = room.tellCharcterLinks();
    document.getElementById("enemyarea").innerHTML = linkedCharcter;

    linkedObject = room.tellObjectLinks();
    document.getElementById("itemarea").innerHTML = linkedObject;
}




function startGame() {
    let currentRoom = Outside;
    // let currentItem = def
    displayRoomStory(currentRoom)
    displayRoomInfo(currentRoom);
    examineRoom(currentRoom);
    // displayRoomLinks(currentRoom);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("ui").value;
            const directions = ["north", "south", "east", "west", "upstairs", "downstairs", "lobby", "landing"]
            const items = ["knife"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.moveRooms(command)
                displayRoomStory(currentRoom)
                displayRoomInfo(currentRoom)
                examineRoom(currentRoom)
            }
            // else if (items.includes(command.toLowerCase())) {
            //         currentItem = currentItem.moveitem(command)
            //         examineItem(currentItem)
            // }
            else {
                document.getElementById("ui").value = ""
                alert("you can not do that, please try a new command")
            }
        }
    });
}



startGame()

// let GroundArray = [G1, G2, G3, G4];


// function shuffle(GroundArray) {
//     for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
// }




