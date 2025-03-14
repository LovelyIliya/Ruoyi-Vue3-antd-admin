import type { Ref } from 'vue';
export function useTableHeight(
  tableData: Ref,
  containerEl: Ref,
  topCardEl?: Ref,
  otherHeight?: number,
) {
  const tableHeight = ref<string>('');
  // 定义固定的一些元素高度
  const headerHeight = 60;
  const contentPadding = 48;
  let cardBodyPadding = 18;
  let paginationHeight = 0;
  let formHeight = 0;
  let topMargin = 0;
  let cardHaveHead = false;
  let cardHeadHeight = 0;

  onMounted(() => {
    computedHeight();
  });
  watch(
    () => tableData,
    () => {
      computedHeight();
    },
    { deep: true },
  );

  window.addEventListener('resize', computedHeight);
  onUnmounted(() => {
    window.removeEventListener('resize', computedHeight);
  });

  async function computedHeight() {
    await nextTick();
    // 无数据时不显示分页器
    if (tableData.value.length) {
      paginationHeight = 60;
      cardBodyPadding = 18;
    } else {
      paginationHeight = 0;
      cardBodyPadding = 38;
    }
    // 包裹卡片是否有标题
    cardHaveHead = containerEl.value.$el.children[0].className === 'ant-card-head';
    if (cardHaveHead) {
      const { height } = containerEl.value.$el.children[0].getBoundingClientRect();
      cardHeadHeight = height;
    }
    if (topCardEl) {
      const { height } = topCardEl.value.$el.getBoundingClientRect();
      formHeight = height;
      topMargin = 24;
    }
    if (tableData.value.length) {
      containerEl.value.$el.children[cardHaveHead ? 1 : 0].style.paddingBottom = '0';
    } else {
      containerEl.value.$el.children[cardHaveHead ? 1 : 0].style.paddingBottom = '24px';
    }
    const tableHeaderEl: HTMLElement = document.querySelector('.ant-table-thead') as HTMLElement;
    const { height: tableHeaderHeight } = tableHeaderEl.getBoundingClientRect();
    const countHeight = Math.ceil(
      headerHeight +
        contentPadding +
        cardBodyPadding +
        cardHeadHeight +
        paginationHeight +
        formHeight +
        topMargin +
        tableHeaderHeight +
        (otherHeight || 0),
    );
    tableHeight.value = 'calc(100vh - ' + countHeight + 'px)';
    // 表格内容高度
    const tableBodyEl: HTMLElement = document.querySelector('.ant-table-body') as HTMLElement;
    tableBodyEl.style.height = tableHeight.value;
    // 无数据时高度
    const emptyEl: HTMLElement = document.querySelector('.ant-empty') as HTMLElement;
    if (emptyEl) {
      emptyEl.style.height =
        'calc(100vh - ' +
        (countHeight +
          100 +
          (tableBodyEl.scrollWidth > tableBodyEl.getBoundingClientRect().width ? 20 : 0)) +
        'px)';
    }
  }

  return { tableHeight };
}
