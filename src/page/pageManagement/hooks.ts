import { useMount, useRequest } from "ahooks"
import { useState } from "react"
import { IPagePermissionProps, IPageProps } from "types/page"
import { getPageTree, updatePage, deletePage, findPageById, addPage ,addPermission, updatePermission, deletePermission} from "../../services/api/pages"
import type { DataNode, TreeProps } from 'antd/es/tree';
type CustomDataNode = DataNode & {
    parnet?: string;
    pagePath: string;
}
export const useAction = () => {

    const [page, setPage] = useState<DataNode[]>([])

    const [pageProps, setPageProps] = useState<Map<string, IPageProps>>(new Map())

    const [pageFormdata, setPageFormdata] = useState<IPageProps>()

    const [permissionFormdata, setPermissionFormdata] = useState<IPagePermissionProps>()

    const [openSavePageModal, setOpenSavePageModal] = useState<boolean>(false)

    const [openSavePermissionModal, setOpenSavePermissionModal] = useState<boolean>(false)

    const getPageTreeRequest = useRequest(getPageTree, {
        manual: true,
        onSuccess: (result) => {
            setPageProps(flatPageProps(result))
            setPage(mapToDataNode(result))
            if (pageFormdata?.id) {
                setPageFormdata(flatPageProps(result).get(pageFormdata.id))
            }
        }
    })

    const addPageRequest = useRequest(addPage, {
        manual: true,
        onSuccess: (result) => {
            getPageTreeRequest.run()
            setOpenSavePageModal(false)
        }
    })

    const updatePageRequest = useRequest(updatePage, {
        manual: true, 
        onSuccess: () => {
            getPageTreeRequest.run()
            setOpenSavePageModal(false)
        }
    })

    const deletePageRequest = useRequest(deletePage, {
        manual: true,
        onSuccess: () => {
            getPageTreeRequest.run()
        }
    })

    const addPermissionRequest = useRequest(addPermission, {
        manual: true,
        onSuccess: () => {
            getPageTreeRequest.run()
        }
    })

    const updatePermissionRequest = useRequest(updatePermission, {
        manual: true,
        onSuccess: () => {
            getPageTreeRequest.run()
        }
    })

    const deletPermissionRequest = useRequest(deletePermission, {
        manual: true,
        onSuccess: () => {
            getPageTreeRequest.run()
        }
    })

    const flatPageProps = (data: IPageProps[]): Map<string, IPageProps> => {
        const result:Map<string, IPageProps> = new Map()
        data.forEach(item => {
            if (item.children) {
                flatPageProps(item.children).forEach(child => {
                    result.set(child.id, child)
                })
            }
            result.set(item.id, item)
        })
        return result;
    }

    const findPagePropsById = (id:string):IPageProps|undefined => {
        return pageProps.get(id);
    }

    function getDataNode(id: string, name: string, parent: string, pagePath: string, children: DataNode[] | undefined): CustomDataNode {
        return {
            key: id,
            title: name,
            children: children,
            parent: parent,
            pagePath: pagePath
        } as CustomDataNode
    }



    const mapToDataNode = (data: IPageProps[]): CustomDataNode[] => {
        return data.map(item => getDataNode(item.id, item.name, item.parent, item.pagePath, item.children ? mapToDataNode(item.children) : undefined))
    }

    useMount(() => getPageTreeRequest.run())

    const onSelectPage: TreeProps['onSelect'] = (selectedKeys, info) => {
        setPageFormdata(findPagePropsById(info.node.key.toString()))
    };

    const onSavePage = (values: IPageProps) => {
        const data = {
            ...values,
            id: pageFormdata?.id
        } as IPageProps
        if (data.id) {
            updatePageRequest.run(data)
        } else {
            addPageRequest.run(data)
        }
    };

    const onDeletePage = () => {
        if(pageFormdata?.id) {
            deletePageRequest.run([pageFormdata.id])
        }

    }
    const onSavePermission = (values: IPagePermissionProps) => {
        const data = {
            ...values,
            id: permissionFormdata?.id,
            pageId: pageFormdata?.id
        } as IPagePermissionProps
        if (data.id) {
            updatePermissionRequest.run(data)
        } else {
            addPermissionRequest.run(data)
        }
        setOpenSavePermissionModal(false)
    }


    const onDeletePermission = (id:string) => {
        deletPermissionRequest.run([id])
    }

    return {
        page,
        pageFormdata,
        permissionFormdata,
        openSavePageModal,
        openSavePermissionModal,
        setOpenSavePermissionModal,
        onDeletePage,
        onSelectPage,
        onSavePage,
        setOpenSavePageModal,
        setPageFormdata,
        setPermissionFormdata,
        onSavePermission,
        onDeletePermission
    }
}