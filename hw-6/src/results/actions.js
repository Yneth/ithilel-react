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

export function addScore(user) {
    if (user.error) {
        return user;
    }
    if (user.error) {
        return user;
    }
    const totalStars = user.repos.data.reduce((acc, repo) => repo.stargazers_count + acc, 0);
    return {...user, score: user.profile.data.followers + totalStars, totalStars};
}

export function assignWinnersAndLosers(players) {
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
    return players;
}
