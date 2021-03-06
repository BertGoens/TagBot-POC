import * as builder from 'botbuilder'
import { ISettings, SettingsStore } from '../../stores'

export const UnignoreUserialog: builder.IDialogWaterfallStep[] = [
	async function sendIgnoreMessage(session, args, next) {
		const message = new builder.Message().text(
			"I'll send you again if you have documents missing tags."
		)

		const userId = session.message.user.id
		const channel = session.message.source

		try {
			const result = await SettingsStore.GetSettingsById(userId)
			const newSettings: ISettings = {
				botMutedUntill: null,
				channelId: result.data.channelId,
				userId: result.data.userId,
			}

			await SettingsStore.SaveSettingsById(newSettings)
			session.send(message)
		} catch (error) {
			session.send('Something went wrong, please try again later.')
		}
	},
]
