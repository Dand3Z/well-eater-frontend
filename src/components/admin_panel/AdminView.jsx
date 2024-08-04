
import ToDeleteForm from "./ToDeleteForm.jsx";
import FindAndEditForm from "./FindAndEditForm.jsx";

function AdminView({ initData, loadPageFunc }) {

    return (
        <>
            <ToDeleteForm
                initData={initData}
                loadPageFunc={loadPageFunc} />
            <FindAndEditForm />
        </>
    )
}

export default AdminView;