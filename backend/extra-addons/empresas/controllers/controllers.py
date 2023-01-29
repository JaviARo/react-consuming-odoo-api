# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class Empresas(http.Controller):

    @http.route('/api/empresas/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        empresas_rec = request.env['empresas.empresas'].sudo().search([])
        empresas = []
        for rec in empresas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'imagen': rec.imagen,
                'description': rec.description,
                'ingresos': rec.ingresos,
                'gastos': rec.gastos,
                'beneficios': rec.beneficios,
                'rentabilidad': rec.rentabilidad
            }
            empresas.append(vals)
        return {'status': 200, 'response': empresas, 'message': 'Success'}

    @http.route('/api/empresas/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['empresas.empresas']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'name': rec.name,
            'imagen': rec.imagen,
            'description': rec.description,
            'ingresos': rec.ingresos,
            'gastos': rec.gastos,
            'beneficios': rec.beneficios,
            'rentabilidad': rec.rentabilidad
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/empresas/findByName', type="json", auth="public", csrf=True, cors='*')
    def findByBrand(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        empresas_rec = request.env['empresas.empresas'].sudo().search([('name', '=ilike', reg_exp)])
        empresas = []
        for rec in empresas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'imagen': rec.imagen,
                'description': rec.description,
                'ingresos': rec.ingresos,
                'gastos': rec.gastos,
                'beneficios': rec.beneficios,
                'rentabilidad': rec.rentabilidad
            }
            empresas.append(vals)
        return {'status': 200, 'response': empresas, 'message': 'Success'}

    @http.route('/api/empresas/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["empresas.empresas"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/empresas/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["empresas.empresas"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/empresas/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["empresas.empresas"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/empresas/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["empresas.empresas"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_empresas = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_empresas.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data
