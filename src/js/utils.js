export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    Object.assign(element, options);

    return element;
}

export function createSelect(optionsList, selectOptions = {}){
    const select = createElement("select", selectOptions);

    optionsList.forEach(opt => {
        const option = createElement("option", {
            value: opt.value,
            textContent: opt.label
        })
        select.appendChild(option);
    });

    return select;

}