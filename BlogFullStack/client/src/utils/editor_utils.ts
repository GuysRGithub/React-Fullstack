// noinspection JSUnusedGlobalSymbols


export const containerTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"]
// tags do not add container in editor
export const tagsUnTouch = ["span", "input"]

export function getFirstParentWithTag(tag: string, child: HTMLElement | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child
    while (selectionNode != null && selectionNode.tagName?.toLowerCase() !== tag.toLowerCase()) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}

export function getFirstChildWithTag(tag: string, child: HTMLElement | null) {
    if (child == null || !child.querySelectorAll) return null;
    const selects = child.querySelectorAll(tag)
    if (selects.length > 0) {
        return selects[0] as HTMLElement
    }
    return null;
}

export function getFirstParentContainer(child: HTMLElement | Node | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    return getFirstParentWithTags(containerTags, child)
}

export function getFirstChildContainer(child: HTMLElement | Node | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    return getFirstChildWithTags(containerTags, child)
}

export function getFirstParentWithTags(tag: Array<String>, child: HTMLElement | Node | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child as HTMLElement | null
    while (selectionNode != null && !tag.includes(selectionNode.tagName?.toLowerCase())) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}

export function getFirstParentTextNode(child: HTMLElement | Node | null) {
    let selectionNode: HTMLElement | null = child as HTMLElement | null
    while (selectionNode != null && selectionNode?.nodeType == Node.TEXT_NODE) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}

export function getFurthestParentOfOnlyTextNode(child: HTMLElement | Node | null) {
    let selectionNode: HTMLElement | null = child as HTMLElement | null
    while (selectionNode != null && selectionNode?.childNodes.length == 1) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}

export function getFirstChildWithTags(tag: Array<String>, child: HTMLElement | Node | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child as HTMLElement | null
    let count = 0;
    let countParent = 0;
    let childSelectNode = selectionNode
    while (selectionNode != null && childSelectNode != null && selectionNode.children && selectionNode.children.length > 0 && !tag.includes(selectionNode.tagName?.toLowerCase())) {
        selectionNode = childSelectNode.children[count] as HTMLElement | null
        if (selectionNode && count == selectionNode.children.length - 1) {
            childSelectNode = childSelectNode.children[countParent] as HTMLElement
            countParent++
        }
        count++;
    }
    return tag.includes(selectionNode?.tagName?.toLowerCase() ?? "") ? selectionNode : null
}

export function getFirstParentNotWithTag(tag: string, child: HTMLElement | null) {
    let selectionNode: HTMLElement | null = child
    do {
        selectionNode = selectionNode?.parentElement as HTMLElement | null
    } while (selectionNode != null && selectionNode.tagName?.toLowerCase() === tag.toLowerCase());

    return selectionNode
}

export function removeAllChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function rangeIntersectsNode(range: Range | null, node: Node) {
    if (range == null) return false
    let nodeRange;
    if (range.intersectsNode) {
        return range.intersectsNode(node);
    } else {
        nodeRange = node.ownerDocument?.createRange();
        if (nodeRange == null) return false
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }

        return range.compareBoundaryPoints(Range.END_TO_START, nodeRange) === -1 &&
            range.compareBoundaryPoints(Range.START_TO_END, nodeRange) === 1;
    }
}

export function getSelectedElementTags(win: Window) {
    let sel, elmlist = [], treeWalker, containerElement;
    let range: Range | null = null
    sel = win.getSelection();
    if (sel == null) return []
    if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
    }
    if (range) {
        containerElement = range.commonAncestorContainer;
        if (containerElement.nodeType !== 1) {
            containerElement = containerElement.parentNode;
        }
        if (containerElement == null) return
        treeWalker = win.document.createTreeWalker(
            containerElement,
            NodeFilter.SHOW_ELEMENT,
            // @ts-ignore
            function (node) {
                return rangeIntersectsNode(range, node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            },
            false
        );

        elmlist = [treeWalker.currentNode];
        while (treeWalker.nextNode()) {
            elmlist.push(treeWalker.currentNode);
        }

        return elmlist
    }
}

export function getContainerSelectedElements(window: Window) {
    const selectedElements = new Set(getSelectedElementTags(window)?.filter(it => containerTags.includes(it.nodeName.toLowerCase())))
    if (selectedElements == null) return selectedElements

    let selection = window.getSelection()
    if (selection == null) return selectedElements
    if (selection.rangeCount == 0) return selectedElements;
    let selectionElement = selection.anchorNode as HTMLElement | null
    const container = getFirstParentContainer(selectionElement)
    if (container) {
        selectedElements.add(
            container
        )
    }

    return selectedElements
}

export function removeAllText(element: Node) {

    // loop through all the nodes of the element
    const nodes = element.childNodes;

    for(let i = 0; i < nodes.length; i++) {

        const node = nodes[i];
        // if it's a text node, remove it
        if(node.nodeType == Node.TEXT_NODE) {
            node.parentNode?.removeChild(node);
            i--; // have to update our incrementor since we just removed a node from childNodes

        } else
            // if it's an element, repeat this process
        if(node.nodeType == Node.ELEMENT_NODE) {
            removeAllText(node);
        }
    }
}

export function removeParent(element: Node) {
    const fragment = document.createDocumentFragment();
    while(element.firstChild) {
        fragment.appendChild(element.firstChild);
    }
    element.parentNode?.replaceChild(fragment, element);
}

export function hasParentWithTag(tag: Array<String>, child: HTMLElement | Node | null) {
    let selectionNode: HTMLElement | null = child as HTMLElement | null
    while (selectionNode != null && !tag.includes(selectionNode.tagName?.toLowerCase())) {
        selectionNode = selectionNode.parentElement
    }
    return tag.includes(selectionNode?.tagName?.toLowerCase() ?? "")
}