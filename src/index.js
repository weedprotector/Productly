import { Article } from "./js/Article";
import { Modal } from "./js/Modal";
import { ArticleModal } from "./js/ArticleModal";

const data = [
    {
        id: 1,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: 'src/img/svg/strategies/increasing.svg',
        tags: ['All', 'Design'],
        content: 'Some content...',
        date: '21.02.2023' 
    },
    {
        id: 2,
        title: 'Motivation Is The First Step To Success',
        urlToImage: 'src/img/svg/strategies/motivation.svg',
        tags: ['Culture'],
        content: 'Some content...',
        date: '21.02.2023'
    },
    {
        id: 3,
        title: 'Success Steps For Your Personal Or Business Life',
        urlToImage: 'src/img/svg/strategies/success.svg',
        tags: ['Culture', 'Design', 'Art'],
        content: 'Some content...',
        date: '21.02.2023'
    },
    {
        id: 4,
        title: 'Success Steps For Your Personal Or Business Life Plus Funny Image on the Back',
        urlToImage: 'src/img/svg/strategies/success2.jpg',
        tags: ['Culture', 'Design', 'Art'],
        content: 'Some content...',
        date: '21.02.2023'
    },
    {
        id: 5,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: 'src/img/svg/strategies/increasing2.svg',
        tags: ['Design'],
        content: 'Some content...',
        date: '21.02.2023'
    }
];


window.onload = function() {
    //Render Articles
    if (data) {
        renderArticlesToDOM();
    }

    // Tags
    addTagsClickHandler(); 
};

const addTagsClickHandler = () => {
    const tagsParent = document.querySelector('.strategies__tags');
    tagsParent.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            let clickedTag = event.target;
            removeSelectedTags();
            selectClickedTag(clickedTag);
            if (clickedTag.innerText === "All") {
                showAllStrategies();
            } else {
                filterStrategyBySelectedTag(clickedTag.innerText);
            }
        }
    })
}
const removeSelectedTags = () => {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('tag_selected');
        tag.classList.add('tag_bordered');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag_selected');
    clickedTag.classList.remove('tag_bordered');
}

const showAllStrategies = () => {
    let strategies = document.querySelectorAll('.strategy');
    strategies.forEach(strategy => {
        strategy.classList.remove('strategy_hidden')
    })
}

const filterStrategyBySelectedTag = (selectedTag) => {
    let strategies = document.querySelectorAll('.strategy');
    strategies.forEach(strategy => {
        strategy.classList.add('strategy_hidden');
        strategy.querySelectorAll('.tag').forEach(tag => {
            if (tag.innerText === selectedTag) {
                strategy.classList.remove('strategy_hidden')
            }
        })
    })
}

const renderArticlesToDOM = () => {
    const strategiesWrapper = getStrategiesWrapper();
    generateArticles(data).forEach(article => {
        strategiesWrapper.append(article.generateArticle())
    });

    addStrategyClickHandler();
}

const getStrategiesWrapper = () => {
    const strategiesContainer = document.querySelector('.strategy-wrapper');
    strategiesContainer.innerHTML = '';
    return strategiesContainer;
}

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article))
    });
    return articles;
}

const addStrategyClickHandler = () => {
    document.querySelector('.strategy-wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.strategy')) {
            let clickedStrategyId = e.target.closest('.strategy').getAttribute('data-id');
            let clickedStrategyData = getClickedData(clickedStrategyId);
            renderArticleModalWindow(clickedStrategyData);
        }
    })
}

const getClickedData = (id) => {
    return data.find(article => article.id == id)
}

const  renderArticleModalWindow = (article) => {
    let modal = new ArticleModal ('arcticle-modal', article);
    modal.renderModal()
}