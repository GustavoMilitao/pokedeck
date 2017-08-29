var app = angular.module('pokedeck', ['angucomplete-alt']);
app.controller('homeCtrl', function ($scope, $http, $timeout, $templateCache, $compile) {
    var user;

    $scope.allSkills = [];
    $scope.allPokemons = [];
    $scope.user = "";
    $scope.ready = false;
    $scope.teams = [];

    $scope.completePokemon = function (team) {
        if (team.pokemonPartialName && team.pokemonPartialName != "") {
            team.hideThisPokemon = false;
            var output = [];
            angular.forEach($scope.allPokemons.pokemons.results, function (pokemon) {
                if (pokemon.name.toLowerCase().indexOf(team.pokemonPartialName.toLowerCase()) >= 0) {
                    output.push(pokemon);
                }
            });
            team.filterPokemon = output;
        } else {
            team.hideThisPokemon = true;
        }
    }
    $scope.insertLinePokemon = function (team, pokemonData) {
        if (team.pokemons.length <= 5) {
            if (contemPokemonNaLista(pokemonData.name, team.pokemons)) {
                alert(pokemonData.name + " já adicionado ao time. Escolha outro.");
            } else {
                pokemonData.skills = [];
                team.pokemons.push(pokemonData);
                team.pokemonPartialName = "";
                team.hideThisPokemon = true;
                $http({
                    method: "PUT",
                    url: '/teams/' + team._id,
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: team
                });
            }
        } else {
            alert("São permitidos apenas 6 pokemóns por time")
        }
    }
    $scope.excluirPokemon = function (team, pokemonName) {
        var oldPokemons = team.pokemons.slice(0);
        team.pokemons = removeFunction(team.pokemons, 'name', pokemonName);
        $http({
            method: "PUT",
            url: '/teams/' + team._id,
            headers: {
                'Content-Type': "application/json"
            },
            data: team
        })
            .then(function (success) {
                if (!success.data.success) {
                    $scope.teams.pokemons = oldPokemons;
                }
            });
    }
    $scope.excluirSkill = function (team,pokemon, skillName) {
        var oldSkills = pokemon.skills.slice(0);
        pokemon.skills = removeFunction(pokemon.skills, 'name', skillName);
        $http({
            method: "PUT",
            url: '/teams/' + team._id,
            headers: {
                'Content-Type': "application/json"
            },
            data : team
        })
            .then(function (success) {
                if (!success.data.success) {
                    pokemon.skills = oldSkills;
                }
            });
    }
    $scope.completeSkill = function (pokemon) {
        if (pokemon.skillPartialName && pokemon.skillPartialName != "") {
            pokemon.hideThisSkill = false;
            var output = [];
            angular.forEach($scope.allSkills.skills.results, function (skill) {
                if (skill.name.toLowerCase().indexOf(pokemon.skillPartialName.toLowerCase()) >= 0) {
                    output.push(skill);
                }
            });
            pokemon.filterSkill = output;
        } else {
            pokemon.hideThisSkill = true;
        }
    }
    $scope.insertLineSkill = function (team, pokemon, skillData) {
        if (pokemon) {
            if (pokemon.skills.length <= 3) {
                if (!contemSkillNaListaDoPokemon(skillData.name, pokemon)) {
                    pokemon.skills.push(skillData);
                    pokemon.skillPartialName = "";
                    pokemon.hideThisSkill = true;
                    $http({
                        method: "PUT",
                        url: '/teams/' + team._id,
                        headers: {
                            'Content-Type': "application/json"
                        },
                        data: team
                    });
                } else {
                    alert(skillData.name + " já adicionado às habilidades do "
                        + pokemon.name + ". Escolha outra.");
                }
            } else {
                alert("só é possível escolher 4 habilidades para cada pokémon");
            }
        } else {
            alert("Erro");
        }
    }
    $scope.excluirTime = function (team) {
        $http({
            method: "DELETE",
            url: '/teams/' + team._id,
            headers: {
                'Content-Type': "application/json"
            },
            data: {}
        })
            .then(function (success) {
                if (success.data.success) {
                    $scope.teams = removeFunction($scope.teams, '_id', team._id);
                }
            });
    }
    $scope.adicionarTime = function () {
        var userId = getCookie("user");
        $http({
            method: "POST",
            url: '/teams',
            headers: {
                'Content-Type': "application/json"
            },
            data: { idUser: userId }
        })
            .then(function (success) {
                if (success.data.success) {
                    $scope.teams.push(success.data.team);
                }
            });
    }
    $scope.atualizarNomeTime = function (team) {
        $http({
            method: "PUT",
            url: '/teams/' + team._id,
            headers: {
                'Content-Type': "application/json"
            },
            data: team
        });
    }
    $scope.logout = function(){
        $scope.ready = false;
        setCookie('user',"",-1);
        window.location.href="/";
    }

    var cookie = getCookie('user');
    if (!cookie) {
        window.location.href = "/";
    } else {
        getLoggedUser($http, $scope);
        getPokemonsList($http, $scope);
        getSkillsList($http, $scope);
        getMyTeams($http, $scope);
    }
});

function contemPokemonNaLista(nome, lista) {
    var contem = false;
    angular.forEach(lista, function (pokemon) {
        if (pokemon.name == nome)
            contem = true;
    });
    return contem;
}

function contemSkillNaListaDoPokemon(nome, pokemon) {
    var contem = false;
    angular.forEach(pokemon.skills, function (skill) {
        if (skill.name == nome)
            contem = true;
    });
    return contem;
}

function getLoggedUser($http, $scope) {
    var userId = getCookie("user");
    $http({
        method: "GET",
        url: '/users/' + userId,
        headers: {
            'Content-Type': "application/json"
        },
        data: {}
    })
        .then(function (success) {
            if (success.data.success) {
                $scope.user = success.data.user.user;
                // $scope.ready = true;
            }
        });
}

function getPokemonsList($http, $scope) {
    $http({
        method: "GET",
        url: '/pokemons',
        headers: {
            'Content-Type': "application/json"
        },
    })
        .then(function (success) {
            $scope.allPokemons = success.data;
        });
}

function getSkillsList($http, $scope) {
    $http({
        method: "GET",
        url: '/skills',
        headers: {
            'Content-Type': "application/json"
        },
    })
        .then(function (success) {
            $scope.allSkills = success.data;
            $scope.ready = true;
        });
}

function getMyTeams($http, $scope) {
    var userId = getCookie("user");
    $http({
        method: "GET",
        url: '/users/' + userId + '/teams',
        headers: {
            'Content-Type': "application/json"
        },
    })
        .then(function (success) {
            $scope.teams = success.data.teams;
        });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function removeFunction(myObjects, prop, valu) {
    return myObjects.filter(function (val) {
        return val[prop] !== valu;
    });

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}