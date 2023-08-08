export function getPlayerUserNames(search) {
    const result = [];
    for (let param of search.entries()) {
        const [key, value] = param;
        if (key.startsWith('player-')) {
            result.push(value);
        }
    }
    return result;
}

export function transformToObject(strings, valueTransformer) {
    return strings.reduce((acc, key, index) => {
        const vtransfrom = valueTransformer ? valueTransformer : () => null;
        return {...acc, [key]: vtransfrom(index)}
    }, {})
}

export function calculatePlayerScore({profile, repos}) {
    if (profile.error) {
        return {};
    }
    if (repos.error) {
        return {};
    }
    const totalStars = repos.data.reduce((acc, x) => x.stargazers_count + acc, 0);
    return {score: profile.data.followers + totalStars, totalStars};
}

export function assignWinnersAndLosers(playerData) {
    if (!playerData || !Object.keys(playerData).length) {
        return;
    }

    const players = Object.values(playerData);
    for (let p of players) {
        if (!p) {
            return;
        }
        if (p.hasOwnProperty('isWinner')) {
            return;
        }
        if (p.score == null || p.score === 'profile.error' || p.score === 'repos.error') {
            return;
        }
    }

    players.sort((x0, x1) => x1.score - x0.score);
    players[0].isWinner = true;
    for (let i = 1; i < players.length; i++) {
        players[i].isWinner = false;
    }
    return playerData;
}
