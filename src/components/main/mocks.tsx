export type ContentItem = {
    text: string;
    imageUrl: string;
    imageDescription: string;
};

export type AsideItem = {
    text: string;
    imageUrl: string;
    imageDescription: string;
};

function getContentItems(): Array<ContentItem> {
    return [
        {
            text: 'Що ж таке апітерапія? Дослівно апітерапія означає лікування продуктами бджільництва. Тобто це не тільки сон на вуликах, а ще й лікування прополісом, пергою, маточним молочком, бджолиним підмором тощо.',
            imageUrl: 'content1.jpg',
            imageDescription: 'Бджоли готові зігріти своїм теплом',
        },
        {
            text: 'Апітерапію офіційна медицина визнала не так давно: у 1959 році. Саме тоді виникло й поняття апітерапевт. Не кожен пасічник є апітерапевтом, для цього потрібні грунтовні знання у сфері медицини, зокрема неврології та фізіотерапії.',
            imageUrl: 'content2.jpg',
            imageDescription:
                'Апібудинки як місце для відпочинку як для великих, так і для самих менших',
        },
        {
            text: 'Сон на вуликах не є панацеєю від усіх хвороб, проте має значний вплив у лікуванні дихальної системи, суглобів і опорно рухового апарату, нервової та психічної систем. Комплексний вплив всіх елементів апітерапії має накопичувальний ефект, тобто щоб отримати відчутний результат потрібно спати на вулику принаймні 10 ночей.',
            imageUrl: 'content3.jpg',
            imageDescription: 'Апібудинки як місце для усамітнення',
        },
    ];
}

function getAsideItems(): Array<AsideItem> {
    return [
        {
            text: 'Продаж та дегустація меду, крем меду та медових десертів. Також в нас широкий вибір подарункових наборів  на різний бюджет.',
            imageUrl: 'aside1.jpg',
            imageDescription: 'Медові вироби і ціни приємно вас здивують',
        },
        {
            text:
                'Екскурсії для дітей та дорослих: Ви познайомитеся з особливостями життєдіяльності бджолиної сім"ї, з інструментами пасічника, побачите як викачують мед та відвідаєте музей бджільництва та старожитностей. Музей розташований на двох поверхах і має чимало тематичних відділів: інструменти пасічника, вулики, медогонки, експонати побуту попередніх поколінь, вишиванки та вишиті картини, колекція вишитих рушників та багато іншого.\n' +
                '\n' +
                '  У вартість екскурсії входить дегустація меду з травяним чаєм і печивом. ',
            imageUrl: 'aside2.jpg',
            imageDescription: 'Поповніть свої знання про бджілок і не тільки...',
        },
    ];
}

export async function fetchContentItems(abortSignal?: AbortSignal): Promise<Array<ContentItem>> {
    return new Promise<Array<ContentItem>>((resolve) => {
        setTimeout(() => {
            resolve(getContentItems());
        }, 4000);
    });
}

export async function fetchAsideItems(abortSignal?: AbortSignal): Promise<Array<AsideItem>> {
    return new Promise<Array<AsideItem>>((resolve) => {
        setTimeout(() => {
            resolve(getAsideItems());
        }, 4000);
    });
}