import { useFormChild } from "quasar"
import useSupabase from "src/boot/supabase"
import useAuthUser from "./UseAuthUser"

export default function userApi() {
    const supaBase = useSupabase()
    const { use } = useAuthUser()

    const list = async (table) => {
			const { data, error } = await supabase
  				.from(table)
  				.select('*')
				if(error) throw error
				return data
		}
    const getById = async (table, id) => {
			const { data, error } = await supabase
				.from(table)
				.select('*')
				eq('id', id)
			if(error) throw error
			return data[0]
		}
    const post = async (table, form) => {
			const { data, error } = await supabase
				.from(table)
				.insert([
					{
						...form,
						user_id: user.value.id
					}
				])
			if(error) throw error
			return data
		}
    const update = async (table, form) => {
			const { data, error } = await supabase
				.from(table)
				.update([
					{
						...form,
						user_id: user.value.id
					}
				])
				.match({ id: form.id })
			if(error) throw error
			return data
		}
    const remove = async (table, id) => {
			const { data, error } = await supabase
				.from(table)
				.delete()
				.match({ id: form.id })
			if(error) throw error
			return data
		}

    return{
			list,
			getById,
			post,
			update,
			remove
    }        
}