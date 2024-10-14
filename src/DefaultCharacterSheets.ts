export type Skill = {
    name: string
    value: number
    checked: boolean
    tags: string[]
}
export type Power = {
    name: string,
    value: number,
    intensity: string,
    cost: number,
    description: string,
    checked: boolean
}

export const defaultMagicWorld = {
    "personal": {
        "name": "Sorwin",
        "player": "Mathew",
        "culture": "",
        "gender": "M",
        "handedness": "",
        "height": "",
        "weight": "",
        "profession": "",
        "wealth": "",
        "religion": "St. Serafina (Uriel)",
        "otherFeatures": "",
        "move": "",
        "description": "",
        "birthday": "12th of Breith, 472",
        "age": "15"
    },
    "characteristics": {
        "base": {
            "str": 5,
            "con": 10,
            "siz": 8,
            "int": 12,
            "pow": 14,
            "dex": 11,
            "cha": 9,
            "edu": 6
        },
        "derived": {
            "effort": 25,
            "stamina": 50,
            "damageModifier": "-1d4",
            "idea": 60,
            "luck": 70,
            "agility": 55,
            "charm": 45,
            "knowledge": 30,
            "maxHp": 9
        }
    },
    "currentStatus": {
        "hp": 9,
        "power": 14,
        "luck": 9
    },
    "skills": [
        {
            "name": "Bargain",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Command",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Disguise",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Etiquette",
            "value": 30,
            "tags": [],
            "checked": false
        }, {
            "name": "Fast Talk",
            "value": 11,
            "tags": [],
            "checked": false
        }, {
            "name": "Perform",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Persuade",
            "value": 15,
            "tags": [],
            "checked": false
        }, {
            "name": "Status",
            "value": 15,
            "tags": [],
            "checked": false
        }, {
            "name": "Teach",
            "value": 10,
            "tags": [],
            "checked": false
        }, {
            "name": "Art",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Craft",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Demolition",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Fine Manipulation",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "HeavyMachine",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Repair",
            "value": 15,
            "tags": [],
            "checked": false
        }, {
            "name": "Sleight Of Hand",
            "value": 14,
            "tags": [],
            "checked": false
        }, {
            "name": "Appraise",
            "value": 15,
            "tags": [],
            "checked": false
        }, {
            "name": "First Aid",
            "value": 30,
            "tags": [],
            "checked": false
        }, {
            "name": "Gambling",
            "value": 36,
            "tags": [],
            "checked": false
        }, {
            "name": "Literacy",
            "value": 38,
            "tags": [],
            "checked": false
        }, {
            "name": "Medicine",
            "value": 26,
            "tags": [],
            "checked": false
        }, {
            "name": "Psychotherapy",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Strategy",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Technical",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Insight",
            "value": 37,
            "tags": [],
            "checked": false
        }, {
            "name": "Listen",
            "value": 26,
            "tags": [],
            "checked": false
        }, {
            "name": "Navigate",
            "value": 10,
            "tags": [],
            "checked": false
        }, {
            "name": "Research",
            "value": 12,
            "tags": [],
            "checked": false
        }, {
            "name": "Sense",
            "value": 10,
            "tags": [],
            "checked": false
        }, {
            "name": "Spot",
            "value": 53,
            "tags": [],
            "checked": false
        }, {
            "name": "Track",
            "value": 10,
            "tags": [],
            "checked": false
        }, {
            "name": "Climb",
            "value": 67,
            "tags": [],
            "checked": false
        }, {
            "name": "Drive",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Fly",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Hide",
            "value": 10,
            "tags": [],
            "checked": false
        }, {
            "name": "Jump",
            "value": 25,
            "tags": [],
            "checked": false
        }, {
            "name": "Pilot",
            "value": 1,
            "tags": [],
            "checked": false
        }, {
            "name": "Projection",
            "value": 22,
            "tags": [],
            "checked": false
        }, {
            "name": "Ride",
            "value": 5,
            "tags": [],
            "checked": false
        }, {
            "name": "Stealth",
            "value": 71,
            "tags": [],
            "checked": false
        }, {
            "name": "Swim",
            "value": 25,
            "tags": [],
            "checked": false
        }, {
            "name": "Throw",
            "value": 25,
            "tags": [],
            "checked": false
        }, {
            "name": "Dodge",
            "value": 22,
            "tags": ["combat"],
            "checked": false
        }, {
            "name": "Martial Arts",
            "value": 1,
            "tags": ["combat"],
            "checked": false
        }, {
            "name": "Brawl",
            "value": 30,
            "tags": ["combat", "weapon"],
            "checked": false
        }, {
            "name": "Grapple",
            "value": 32,
            "tags": ["combat", "weapon"],
            "checked": false
        },

        {
            "name": "Elven",
            "value": 12,
            "tags": ["language"],
            "checked": false
        }, {
            "name": "Common",
            "value": 60,
            "tags": ["language"],
            "checked": false
        }, {
            "name": "Yuyan",
            "value": 23,
            "tags": ["language"],
            "checked": false
        },

        {
            "name": "Herbalism",
            "value": 9,
            "tags": ["craft"],
            "checked": false
        },

        {
            "name": "Plague",
            "value": 2,
            "tags": ["knowledge"],
            "checked": false
        }, {
            "name": "Nobility",
            "value": 2,
            "tags": ["knowledge"],
            "checked": false
        }, {
            "name": "Weave",
            "value": 33,
            "tags": ["knowledge"],
            "checked": false
        },

        {
            "name": "Somaturgy",
            "value": 12,
            "tags": ["science"],
            "checked": false
        }, {
            "name": "Alchemy/Poisons",
            "value": 34,
            "tags": ["science"],
            "checked": false
        }, {
            "name": "Pyromancy",
            "value": 9,
            "tags": ["science"],
            "checked": false
        },

        {
            "name": "Elf Paranoia",
            "value": 57,
            "tags": ["flaw"],
            "checked": false
        }, {
            "name": "Pride",
            "value": 9,
            "tags": ["flaw"],
            "checked": false
        },

        {
            "name": "Athletics",
            "value": 45,
            "tags": [],
            "checked": false
        }, {
            "name": "Survival",
            "value": 24,
            "tags": ["science"],
            "checked": false
        }
    ],
    "inventory": [{
        "name": "Basic Travelling Provisions",
        "amount": "1"
    }, {
        "name": "Flame-Resistant Rope",
        "amount": "1"
    }, {
        "name": "Seal of House Lorricci",
        "amount": "1"
    }, {
        "name": "Book - Cures to Common Poisons",
        "amount": "1"
    }, {
        "name": "Travelling Alchemy Set (damaged)",
        "amount": "1"
    }, {
        "name": "Book - The Lunar Codex: Phases of Power",
        "amount": "1"
    }, {
        "name": "Book - Verdant Secrets: The Alchemy of the Southern Jungles <elvish>",
        "amount": "1"
    }, {
        "name": "Mosswoven Pouch",
        "amount": "1"
    }
    ],
    "notes": [
        "Blood-Debt to Jensu"
    ],
    "powers": [{
        "name": "Knit Wound",
        "value": 3,
        "intensity": "1d3",
        "cost": 3,
        "description": "",
        "checked": false
    }, {
        "name": "Bruisebane",
        "value": 11,
        "intensity": "1/day",
        "cost": 3,
        "description": "",
        "checked": false
    }, {
        "name": "Minor Flame",
        "value": 7,
        "intensity": "",
        "cost": 2,
        "description": "",
        "checked": false
    }, {
        "name": "Resist Flame",
        "value": 20,
        "intensity": "1 Fire Armor",
        "cost": 2,
        "description": "",
        "checked": false
    }, {
        "name": "Blinding Light",
        "value": 5,
        "intensity": "",
        "cost": 6,
        "description": "",
        "checked": false
    }
    ]
}