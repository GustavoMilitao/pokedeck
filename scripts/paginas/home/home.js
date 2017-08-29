var app = angular.module('pokedeck', ['angucomplete-alt']);
app.controller('homeCtrl', function ($scope, $http, $timeout, $templateCache, $compile) {
    var user;

    $scope.allSkills = [];
    $scope.allPokemons = [];
    $scope.ready = false;
    $scope.htmlTeam = "";
    $scope.editandoTime = false;
    $scope.index = 0;
    $scope.team = {
        idDiv: "",
        name: "",
        pokemons: []
    }

    $scope.teams = [];

    $scope.form = {
        user: "",
        teams: []
    };
    $scope.pokemonPartialName = "";
    $scope.skillPartialName = "";
    $scope.completePokemon = function (string) {
        if (string && string != "") {
            $scope.hideThisPokemon = false;
            var output = [];
            angular.forEach($scope.allPokemons.pokemons.results, function (pokemon) {
                if (pokemon.name.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(pokemon);
                }
            });
            $scope.filterPokemon = output;
        } else {
            $scope.hideThisPokemon = true;
        }
    }
    $scope.insertLinePokemon = function (pokemonData) {
        if ($scope.team.pokemons.length <= 5) {
            if (contemPokemonNaLista(pokemonData.name, $scope.team.pokemons)) {
                alert(pokemonData.name + " já adicionado ao time. Escolha outro.");
            } else {
                pokemonData.skills = [];
                $scope.team.pokemons.push(pokemonData);
                $scope.pokemonPartialName = "";
                $scope.hideThisPokemon = true;
            }
        } else {
            alert("São permitidos apenas 6 pokemóns por time")
        }
    }
    $scope.completeSkill = function (string) {
        if (string && string != "") {
            $scope.hideThisSkill = false;
            var output = [];
            angular.forEach($scope.allSkills.skills.results, function (skill) {
                if (skill.name.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(skill);
                }
            });
            $scope.filterSkill = output;
        } else {
            $scope.hideThisSkill = true;
        }
    }
    $scope.insertLineSkill = function (skillData, pokemon) {
        if (pokemon) {
            if (pokemon.skills.length <= 3) {
                if (!contemSkillNaListaDoPokemon(skillData.name, pokemon)) {
                    pokemon.skills.push(skillData);
                    $scope.skillPartialName = "";
                    $scope.hideThisSkill = true;
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

    $scope.salvarTimePokemon = function () {
        $scope.form.teams.push(
            {
                name: $scope.team.name,
                pokemons: $scope.team.pokemons
            }
        );
        $scope.team = {
            idDiv: "",
            name: "",
            pokemons: []
        }
        // gravar no banco
    }

    $scope.cancelarTimePokemon = function () {
        document.getElementById($scope.team.idDiv).remove();
        $scope.index--;
        $scope.editandoTime = false;
        $scope.team = {
            idDiv: "",
            name: "",
            pokemons: []
        }
    }

    $scope.adicionarTime = function () {
        $http({
            method: "POST",
            url: '/teams',
            headers: {
                'Content-Type': "application/json"
            },
            data: {}
        })
            .then(function (success) {
                if (success.data.success) {
                    // var el = document.getElementById('times');
                    // angular.element(el).append($compile($scope.htmlTeam)($scope));
                    // document.getElementById('newTeam').setAttribute('id', 'newTeam-' + success.data.id);

                    $scope.teams.push({
                        id: success.data.id,
                        name: "",
                        pokemons: []
                    });
                }
            });
        // // Criar time no banco.
        // // id resultante será o id da nova guia de time.
        // }else{

        // }
        // if (!$scope.editandoTime) {

        // } else {
        //     alert("Termine a edição do time atual");
        // }

        var cookie = getCookie('user');
        if (!cookie) {
            window.location.href = "/";
        } else {
            getLoggedUser($http, $scope);
            getPokemonsList($http, $scope);
            getHTMLTeam($http, $scope);
            getSkillsList($http, $scope);
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

function getPokemonObjectByNameInList(nome, lista) {
    var result = null;
    angular.forEach(lista, function (pokemon) {
        if (pokemon.name == nome)
            result = pokemon;
    });
    return result;
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
                $scope.form.user = success.data.user.user;
                $scope.ready = true;
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
        });
}

function getHTMLTeam($http, $scope) {
    $http.get("/home/team", {
    }).then(function (result) {
        if (result.data.success) {
            $scope.htmlTeam = result.data.partial;
        }
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}