import { api } from "src/boot/axios";
import { ref } from "vue";

const useTable = () => {
  const rows = ref([]);
  const filter = ref("");
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    rowsPerPage: 15,
    rowsNumber: 12,
  });

  async function onRequest(route, requestProp) {
    console.log(requestProp);

    const { page, rowsPerPage } = requestProp.pagination;

    loading.value = true;

    const { data } = await api.get(route, {
      params: {
        page: page,
        itemsPerPage: rowsPerPage,
        search: requestProp.filter != "" ? requestProp.filter : null,
      },
    });

    console.log(data);

    rows.value = data.data;

    // don't forget to update local pagination object
    pagination.value.page = data.meta.current_page;
    pagination.value.rowsPerPage = data.meta.per_page;
    pagination.value.rowsNumber = data.meta.total;
    // ...and turn of loading indicator
    loading.value = false;
  }

  return {
    rows,
    filter,
    loading,
    pagination,
    onRequest,
  };
};

export default useTable;
