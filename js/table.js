// table creation and interactions
window.onload = function () {
  let setColumns = document.getElementsByClassName('js-config-output-cols');
  let setRows = document.getElementsByClassName('js-config-output-rows');
  let setTableSize = document.getElementsByClassName('js-config-output-size');
  let btn = document.getElementsByClassName('btn');
  let getTable = document.getElementsByClassName('table-bordered');
  let newTableHead = document.createElement('thead');
  let newTableBody = document.createElement('tbody');

  btn[0].addEventListener('click', function (e) {
    e.preventDefault();
    createTable(multiplicationTable(+setColumns[0].value, +setRows[0].value, +setTableSize[0].value,), getTable);
  });

  function createTable(array, node) {
    let fragment = document.createDocumentFragment();
    let newTr = document.createElement('tr');

    for (let i = 0; i < array.length; i += 1) {
      let newTh = document.createElement('th');
      newTh.innerHTML = array[0][i];
      newTr.append(newTh);
    }
    newTableHead.append(newTr);
    fragment.append(newTableHead);

    for (let i = 1; i < array.length; i+= 1) {
      let newTr = document.createElement('tr');
      let newTh = document.createElement('th');
      newTh.scope = 'row';
      newTh.innerHTML = array[i][0];
      newTr.append(newTh);

      for (let j = 1; j < array.length; j+= 1) {
        let newTd = document.createElement('td');
        newTd.innerHTML = array[i][j];
        newTr.append(newTd);
        newTableBody.append(newTr);
      }
    }
    fragment.append(newTableBody);

    node[0].innerHTML = '';
    node[0].append(fragment);
  }

  getTable[0].addEventListener('mouseover', function (event) {
    let target = event.target;
      if (target && target.nodeName === "TD") {
        let parent = target.parentNode;
        let thead = document.getElementsByTagName('thead')[0].getElementsByTagName("th")[target.cellIndex];
        target.classList.add('hover');
        thead.classList.add('hover');
        parent.firstElementChild.classList.add('hover');
        target.addEventListener('mouseout', function () {
          target.classList.remove('hover');
          parent.firstElementChild.classList.remove('hover');
          thead.classList.remove('hover');
        })
      }
  })

  getTable[0].addEventListener('click', function (event) {
    let getTbody = document.getElementsByTagName('tbody');
    let target = event.target;
    if (target && target.nodeName === "TD") {
      let prev = target.parentNode.previousSibling;
      let current = target.parentNode;

      if (event.ctrlKey) {
        target.parentNode.remove();
        let getTableHead = document.getElementsByTagName('th');
        if (getTbody[0].rows.length === 0) {
          let arr = [].slice.call(getTableHead);
          arr.forEach(i => {
            if (i.className) {
              i.classList.remove('hover');
            }
          })
        }
        console.log('removed');
      } else {
        if (prev === null) {
          return false;
        }else {
          if(navigator.userAgent.indexOf("Firefox") != -1 ) {
            getTbody[0].replaceChild(prev, current);
            getTbody[0].insertBefore(current, prev);
            target.classList.remove('hover');
            target.parentNode.firstElementChild.classList.remove('hover');
          } else {
            console.log('replaced');
            getTbody[0].replaceChild(prev, current);
            getTbody[0].insertBefore(current, prev);
          }
        }
      }
    }
  })
};