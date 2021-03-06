import * as builder from 'botbuilder'
import * as datefns from 'date-fns'
import { ISettings, SettingsStore } from '../../stores'
import { resolveDateV2 } from '../../util/entity-resolver'

export const IgnoreUserDialog: builder.IDialogWaterfallStep[] = [
	async function sendIgnoreMessage(session, args, next) {
		// try extracting entities
		const muteUntillDate = resolveDateV2(args.entities)

		// fallback: mute for 1 day
		const tomorrow = datefns.addDays(new Date(), 1)

		let ignoreUntill: Date = tomorrow

		if (muteUntillDate) {
			ignoreUntill = muteUntillDate
		} else {
			ignoreUntill = tomorrow
		}

		const message = new builder.Message().text(
			"I won't contact you untill at least " + datefns.format(ignoreUntill, 'DD/MM/YYYY')
		)

		const userId = session.message.user.id
		const channel = session.message.source
		try {
			const userResponse = await SettingsStore.GetSettingsById(userId)
			const newSettings: ISettings = {
				botMutedUntill: ignoreUntill,
				channelId: channel,
				userId: userId,
			}

			const saveResponse = SettingsStore.SaveSettingsById(newSettings)
			session.send(message)
		} catch (error) {
			session.send('Something went wrong, please try again later.')
		}
	},
]
