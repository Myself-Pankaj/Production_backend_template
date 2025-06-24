export type t_http_response = {
    success: boolean
    status_code: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
}
export type t_http_error = {
    success: boolean
    status_code: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}
